const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

const dogController = require('./routes/controllers/dogController');

const app = express();
const PORT = process.env.PORT || 3009;


//Cloudinary.configuration
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const sess = {
  secret: 'andre claire masandra myles',
  cookie: {
    maxAge: 3600000, //300000 = 5 min, 3600000 = 60 min
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

//Post route that captures file
app.post("/api/upload", async (req, res, next) => {
  const form = new formidable.IncomingForm();
  //Grabbing file path
  form.parse(req, function (err, fields, files) {
    console.log(files.dogPic.filepath);
    var localPath = files.dogPic.filepath;
    //Creating new filename and directory to store file locally
    var newPath =
      path.join(__dirname, "uploads") + "/" + files.dogPic.originalFilename;
    var rawData = fs.readFileSync(localPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) console.log(err);
      //Upload to Cloudinary
      uploadImage(req, res, newPath);
      
      //Delete file locally
      deletefile(newPath);
      return console.log("Successfully uploaded");
    });
  });
});

// Cloudinary Function that Uploads an image file
const uploadImage = async (req, res, imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    //Name of folder to upload images to, default is root
    folder: "classImages",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    let request = {...req};
    request.body.pic_hyperlink = result.url;
    request.params.id = req.session.dog_id;
    //console.log(request);
    dogController.update(request, res);
    //console.log(result);
    //console.log(result.public_id);
  } catch (error) {
    console.error(error);
  }
};

// Function to delete uploaded image
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