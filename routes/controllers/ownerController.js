const { Owner, Dog } = require('../../models');
const formidable = require("formidable");
const cloudinary = require('../../config/cloudinary');
const fs = require("fs");
const path = require('path');

exports.getAll = function (req, res) {
  // find all owners, include their dogs
  return Owner.findAll({
    include: Dog
  })
};

exports.getOne = function (req, res) {
  // find one owner by their `id` value (primary key)
  // include their dogs
  return new Promise((resolve, reject) => {
    return Owner.findOne({
      where: { id: req.params.id },
      include: Dog
    })
    .then(owner => {
      req.session.user_id = owner.id;
      resolve(owner)
    })
    .catch(err => reject(err))
  })
  
};

exports.create = function (req, res) {
  // create a new owner and log them in

  return new Promise((resolve, reject) => {
    Owner.create(
      {
        ...req.body
      },
      {
        include: [Dog]
      }
    )
    .then((owner) => {
      req.session.save(() => {
        req.session.user_id = owner.id;
        req.session.logged_in = true;
        req.session.location_zip = owner.location_zip;
        resolve(owner);
      });
    })
    .catch(err => reject(err))
  })
};

exports.login = function (req, res) {
  return new Promise((resolve, reject) => {
    Owner.findOne({
      where: { username: req.body.username }
    })
    .then((owner) => {
      let passMatch = owner.checkPassword(req.body.password);

      if (passMatch) {
        req.session.save(() => {
          req.session.user_id = owner.id;
          req.session.logged_in = true;
          req.session.location_zip = owner.location_zip;

          resolve(owner);
        });
      } else {
        reject('Invalid password or username');
      }
    })
    .catch(err => reject('Invalid password or username'))
  })
};

exports.logout = function (req, res) {
  return new Promise((resolve, reject) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        resolve('Succesfully logged out')
      });
    } else {
      resolve('No user logged in')
    }
  })
};

exports.update = function (req, res) {
  // update a owner by its `id` value
  return Owner.update(req.body, {
    where: {
      id: req.params.id
    }
  })
};

exports.delete = function (req, res) {
  // delete a owner by its `id` value
  return new Promise((resolve, reject) => {
    Owner.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      req.session.destroy(() => resolve('Succesfully deleted'));
    })
    .catch(err => reject(err))
  })
};

exports.uploadPic = function (req, res) {
  const form = new formidable.IncomingForm();
  //Grabbing file path
  form.parse(req, function (err, fields, files) {
    console.log(files.ownerPic.filepath);
    var localPath = files.ownerPic.filepath;
    //Creating new filename and directory to store file locally
    var newPath =
      path.join(__dirname, "../../uploads") + "/" + files.ownerPic.originalFilename;
    var rawData = fs.readFileSync(localPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) console.log(err);
      //Upload to Cloudinary
      uploadImage(newPath)
      .then(image => {
        console.log(image);
        deletefile(newPath);
        Owner.findOne({
          where: {
            id: req.session.user_id
          }
        })
        .then((userData) => {
          console.log("----- HERE IS EVENT OBJECT TO RENDER ------")
          userData.set({pic_hyperlink: image.url});
          userData.save();
          let owner = userData.get({plain: true})
          console.log(owner)
          res.status(200).location('profile', {
            ...owner,
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