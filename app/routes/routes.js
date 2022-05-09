
const { Router } = require("express");
const users = require("../controllers/controller.js");
const mWare = require("../middleware/mware")
var router = require("express").Router();
const upload = require("../middleware/multer")
const validMid = require("../middleware/joiValidator");
const schemaa = require('../models/joiSchema')


// signUp
router.post("/create", validMid(schemaa.userSchema, 'body'), users.create);

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
router.put("/deleteAdd/:id", mWare,users.deleteAdd);


//createPost
router.post("/createPost", mWare, users.Post);

//findAllPost
router.get("/allPost", mWare, users.findAllPost);

//findPost
router.get("/post", mWare, users.findPost);

//aggregateUser
router.get("/users_posts",mWare, users.aggregateUser);


//fileUpload
router.post("/upload", mWare, upload.array("images"),  users.filePost);

//countryUpdate
router.post("/country", mWare, users.Country);

//email
router.post("/email", users.sendEmail);


module.exports = router