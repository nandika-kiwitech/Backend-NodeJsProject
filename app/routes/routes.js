
const { Router } = require("express");
const users = require("../controllers/controller.js");
const mWare = require("../middleware/mware")
var router = require("express").Router();
const upload = require("../middleware/multer")


// signUp
router.post("/create", upload.single('images'), users.create);

// find all Users
router.get("/findAll", users.findAll);

// userLogin
router.post("/login", users.login);

//changePassword
router.post("/changePassword", mWare, users.changePassword);

//deleteUser
router.delete("/delete", mWare, users.delete);

//Address
router.post("/address", mWare, users.address);

//updateAddress
router.put("/updateAdd", mWare, users.updateAdd);


//deleteAddress
router.put("/updateAdd", mWare, users.deleteAdd);


//createPost
router.post("/createPost", mWare, users.Post);

//findAllPost
router.get("/allPost", mWare, users.findAllPost);

//findPost
router.get("/post", mWare, users.findPost);

//fileUpload
router.post("/upload", upload.array("images"),  users.filePost);

module.exports = router