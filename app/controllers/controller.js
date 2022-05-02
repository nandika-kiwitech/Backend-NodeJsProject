var mongoose = require('mongoose');
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const path = require("path")

// Create and Save a new User
module.exports = {
    create: async (req, res) => {
        // Validate request
        try {
            const userInfo = await User.findOne({ email: req.body.email });

            console.log(userInfo)
            if (userInfo) {
                res.status(200).json({ message: "Email already exists" })
                console.log("email already exist")
            }

            //create a User
            else {
                var obj = new User({
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email,
                    password: req.body.password,
                })     
                if(req.file){
                  obj.images = req.file.path

                }           
                console.log(obj)
            }
            // Save Users in the database
            obj.save();
            res.send(obj)

        }
        catch (error) {
            console.log("error", error)
            res.status(500).send({
                message:
                    error.message || "Some error occurred while creating the User."
            });
        };
    },

    //findAll Users from the database.
    findAll: async (req, res) => {
        try {
            let { page, limit } = req.query;
            if (!page) {
                page = 1;
            }
            if (!limit) {
                limit = 2;
            }
            const userInfo = await User.find().limit(limit * 1).skip((page - 1) * limit);
            console.log("user", userInfo)
            res.send({ page, limit, users: userInfo });
        }
        catch (error) {
            res.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving users."
            });
        };
    },

    //login

    login: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            var userInfo = await User.findOne({ email: email });
            if (!userInfo) {
                res.status(400).send("user not found")
            }

            const hashedPassword = await bcrypt.compare(req.body.password, userInfo.password)
            if (!hashedPassword) {
                res.status(400).send("password not match")
            }
            else {
                //create token
                const token = jwt.sign({ email: req.body.email }, "xyz");
                User.token = token;
                console.log("Token", token)
                res.status(200).send({ message: "welcome", token })

            }
        }
        catch (error) {
            console.log("email not matched", error)
            res.status(500).send({
                message:
                    error.message || "email not matched"
            });
        }


    },

    //changePassword 

    changePassword: async (req, res) => {
        try {

            const password = req.body.password;
            const newPassword = req.body.newPassword;
            const userInfo = await User.findOne({ _id: req.user.id });
            if (!userInfo) {
                res.status(400).send("user not found")
            }
            const hashedPassword = await bcrypt.compare(req.body.password, userInfo.password)
            if (!hashedPassword) {
                res.status(400).send("Old password incorrect.")
            }

            //hashPassword 
            const newhash = await bcrypt.hash(newPassword, 10)
            await User.updateOne({ _id: req.user.id }, { password: newhash });
            res.status(200).send({ message: "Password change successfully." });
        }
        catch (error) {
            console.log("eror", error)
            res.status(400).send("error")
        }
    },


    //deleteUser
    delete: async (req, res) => {
        try {
            const userInfo = await User.deleteOne({ _id: req.user.id });
            console.log("deleted", userInfo)
            res.send("user deleted")
        }
        catch (error) {
            res.send(error)
            console.log(error)
        }
    },

    //addAddress
    address: async (req, res) => {
        try {
            var addAddress = await User.findByIdAndUpdate({ _id: req.user.id }, { $push: { address: { hNum: req.body.hNum, area: req.body.area, pinCode: req.body.pinCode, state: req.body.state } }, upsert: true, returnNewDocument: true })
            console.log(addAddress)
            res.send(addAddress)
        } catch (error) {
            console.log(error)
            res.status(400).send("error", error)
        }
    },


    //updateAddress
    updateAdd: async (req, res) => {
        try {
            var findUser = await User.findOne({ id: req.user.id })
            if (findUser) {
                var address = User.updateOne({ _id: req.params.id }, { $push: { address: req.body.address } });
                console.log(req)
                res.send(req)
            }
            else {
                console.log("id not found")
                res.send("id not found")
            }
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },

    //deleteAddress
    deleteAdd: async (req, res) => {
        try {
            var addAddress = await User.findByIdAndUpdate({ _id: req.user.id }, { $pull: { address: { _id: req.params.id } } })
            console.log(addAddress)
            res.send(addAddress)
        }
        catch (error) {
            console.log(error)
            res.status(400).send("error", error)
        }
    },


    //createPost
    Post: async (req, res) => {
        const post = new Post({
            userId: req.user.id,
            title: req.body.title,
            description: req.body.description
        })
        console.log(post)
        post.save();
        res.send(post);
    },


    //findAllPost
    findAllPost: async (req, res) => {
        try {
            let { page, limit } = req.query;
            if (!page) {
                page = 1;
            }
            if (!limit) {
                limit = 2;
            }

            const findAllPost = await Post.find({ userId: req.user.id }).populate({ path: 'userId' }).limit(limit * 1).skip((page - 1) * limit);
            res.send({ page, limit, posts: findAllPost });
        }
        catch (error) {
            console.log("error", error)
            res.send(error)
        }
    },

    //findPost
    findPost: async (req, res) => {
        var findPost = await Post.findOne({ _id: mongoose.Types.ObjectId("626b7ea656a8694d3a593353") }).populate({ path: 'userId' });
        console.log(JSON.stringify(findPost));
        res.send(findPost);
    },

   //imageUpload
    filePost: async (req, res) => {
    // var data = await User.findByIdAndUpdate({_id: req.user.id}, {$push: {images: req.file}})  
        console.log(req.file)
        res.send(req.file)
    },
 }

