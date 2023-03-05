const { Event, Owner, Dog, Comment } = require('../../models');
const formidable = require("formidable");
const cloudinary = require('../../config/cloudinary');
const fs = require("fs");
const path = require('path');

exports.getAll = function (req, res) {
  // find all events, include their dogs
  return Event.findAll({
    include: {
      model: Owner,
      as: 'host',
      include: Dog
    }
  })
};

exports.getAllforZip = function (req, res) {
  let location_zip = req.session.location_zip || 20016;
  return Event.findAll({
    where: { location_zip },
    include: {
      model: Owner,
      as: 'host',
      include: Dog
    }
  })
};

exports.getAllforUser = function (req, res) {
  return Event.findAll({
    where: { host_id: req.session.user_id }
  })
};

exports.getOne = function (req, res) {
  // find one event by their `id` value (primary key)
  return new Promise((resolve, reject) => {
    Event.findOne({
      where: {id: req.params.id},
      include: [{
        model: Owner,
        as: 'host',
        attributes: ['first_name', 'last_name', 'pic_hyperlink'],
        include: { model: Dog }
      }, 
      {
        model: Owner,
        as: 'attendees',
        attributes: ['first_name','last_name', 'pic_hyperlink']
      }, {
        model: Comment,
        attributes: ['text'],
        include: { model: Owner, attributes: ['username', 'pic_hyperlink'] }
      }]
    })
    .then(event => {
      req.session.event_id = event.id
      resolve(event)
    })
    .catch(err => reject(err))
  })
};

exports.create = function (req, res) {
  // create a new event
  let data = req.body;
  data.host_id = req.body.owner_id || req.session.user_id;
  if (!data.host_id) {
    return Promise.reject('No user_id included in req.body or req.session');
  }
  return Event.create(data)
};

exports.update = function (req, res) {
  // update a event by its `id` value
  return Event.update(req.body, {
    where: {
      id: req.params.id
    }
  })
};

exports.delete = function (req, res) {
  // delete a event by its `id` value
  return Event.destroy({
    where: {
      id: req.params.id
    }
  })
};

exports.testFind = function (req, res) {
  Event.findByPk(req.params.id, {
    include: [{
      model: Owner,
      as: 'host',
      attributes: ['first_name', 'last_name', 'pic_hyperlink'],
      include: { model: Dog }
    },
    {
      model: Owner,
      as: 'attendees',
      attributes: ['first_name', 'last_name', 'pic_hyperlink']
    }, {
      model: Comment,
      attributes: ['text'],
      include: { model: Owner, attributes: ['first_name'] }
    }]
  })
  .then((event) => {
    res.status(200).json(event);
  })
  .catch((err) => res.status(400).json(err));
}

exports.uploadPic = function (req, res) {
  const form = new formidable.IncomingForm();
  //Grabbing file path
  form.parse(req, function (err, fields, files) {
    console.log(files.eventPic.filepath);
    var localPath = files.eventPic.filepath;
    //Creating new filename and directory to store file locally
    var newPath =
      path.join(__dirname, "../../uploads") + "/" + files.eventPic.originalFilename;
    var rawData = fs.readFileSync(localPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) console.log(err);
      //Upload to Cloudinary
      uploadImage(newPath)
      .then(image => {
        console.log(image);
        deletefile(newPath);
        Event.findOne({
          where: {
            id: req.session.event_id
          }
        })
        .then((eventData) => {
          console.log("----- HERE IS EVENT OBJECT TO RENDER ------")
          eventData.set({pic_hyperlink: image.url});
          eventData.save();
          let event = eventData.get({plain: true})
          console.log(event)
          res.status(200).location('eventprofile', {
            ...event,
            logged_in: req.session.logged_in
          });
        })
        })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
    });
  });
};
// Cloudinary Function that Uploads an image file
const uploadImage = (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    //Name of folder to upload images to, default is root
    folder: "classImages",
  };
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imagePath, options)
    .then(image => resolve(image))
    .catch(err => reject(err))
    })
};

const deletefile = async (filePath) => {
  const removeFile = await fs.access(filePath, (error) => {
    if (!error) {
      fs.unlink(filePath, function (error) {
        if (error) console.error("Error Occured:", error);
        console.log("File deleted!");
      });
    } else {
      console.error("Error Occured:", error);
    }
  });
};
