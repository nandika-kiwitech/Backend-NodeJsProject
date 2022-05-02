const res = require("express/lib/response");
const multer = require("multer");
const path = require("path")

var upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, './uploads');
      },
      filename: function (req, file, cb) {
         var ext = path.extname(file.originalname)

            cb(null, ext);      
      }
   }),
   
   limits: { fileSize: 5000000 },
   fileFilter: function (req, file, callback) {
      const filetypes = /jpeg|JPEG|jpg|png|gif/;
      const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
         callback(null, true)
      } else {
         console.log("upload only images")
         res.send("upload image only")
      }
   }
})
module.exports = upload



