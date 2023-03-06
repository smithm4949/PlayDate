const { Owner, Dog } = require('../../models');
const formidable = require("formidable");
const cloudinary = require('../../config/cloudinary');
const fs = require("fs");
const path = require('path');

exports.getAll = function (req, res) {
  // find all dogs, include their owners
  Dog.findAll({
    include: Owner
  })
  .then((dogs) => {
    res.status(200).json(dogs);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
};

exports.getOne = function (req, res) {
  // find one dog by its `id` value, include their owners
  Dog.findOne({
    where: { id: req.params.id },
    include: Owner
  })
  .then((dog) => {
    req.session.dog_id = dog.id;
    res.status(200).json(dog);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
};

exports.create = function (req, res) {
  // create a new dog
  let data = req.body;
  data.owner_id = req.body.owner_id || req.session.user_id; 
  if (!data.owner_id) {
    res.status(400).json({message: 'No user_id included in req.body or req.session'});
    return;
  }
  Dog.create(data)
  .then((dog) => {
    res.status(200).json(dog);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
};

exports.update = function (req, res) {
  // update a dog by its `id` value
  Dog.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((dog) => {
      res.status(200).json(dog);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

exports.delete = function (req, res) {
  // delete a dog by its `id` value
  Dog.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dog) => {
      res.status(200).json(dog);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

exports.uploadPic = function (req, res) {
  const form = new formidable.IncomingForm();
  //Grabbing file path
  form.parse(req, function (err, fields, files) {
    console.log(files.dogPic.filepath);
    var localPath = files.dogPic.filepath;
    //Creating new filename and directory to store file locally
    var newPath =
      path.join(__dirname, "../../uploads") + "/" + files.dogPic.originalFilename;
    var rawData = fs.readFileSync(localPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) console.log(err);
      //Upload to Cloudinary
      uploadImage(newPath)
      .then(image => {
        console.log(image);
        deletefile(newPath);
        Dog.findOne({
          where: {
            id: req.session.dog_id
          }
        })
        .then((dogData) => {
          console.log("----- HERE IS DOG OBJECT TO RENDER ------")
          dogData.set({pic_hyperlink: image.url});
          dogData.save();
          let dog = dogData.get({plain: true})
          console.log(dog)
          res.status(200).location('dogprofile', {
            ...dog,
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