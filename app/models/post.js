const mongoose  = require("mongoose");
const schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: String,
    description: String
});






module.exports = mongoose.model("post", schema);