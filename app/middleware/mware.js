
const jwt = require("jsonwebtoken");
const User = require("../models/user");


module.exports = async function mWare(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            res.send("please provide token")
        }
        const decode = jwt.verify(token, "xyz");
        const findUser = await User.findOne({ email: decode.email });
        if (!findUser) {
            res.send("email not found")
        }
        req.user = findUser;
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(401).send("Invalid Token");
    }

}



