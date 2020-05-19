const express = require('express');
const router  = express.Router();

const multer = require('multer');                         // multer middleware for uploading the file 
const upload = multer({dest: './public/uploads'})         // Set the proper path

const Picture = require('./../models/pictures');

router.post('/upload', upload.single('photo'), (req, res, next) => {     // use of middleware -> inject 'photo' in uploads folder
                                                                         // Set req.file.filename 
                                                                         // Set req.file.originalname 
    console.log('req.file', req.file)
  const newPicture = new Picture(
    {
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    }
  ) ;


  newPicture.save()
      .then((uploadedFile) => {
        console.log('uploadedFIle', uploadedFile);
        res.redirect('/')  ;
      })
      .catch(err => console.log(`Error uploading file: ${err}`))

})


/* GET home page */
router.get('/', (req, res, next) => {
  Picture.find()
    .then( files => {
      console.log('files', files);
      res.render('index', {files});
    })
    .catch(err => console.log(`Error getting files: ${err}`))
});

module.exports = router;
