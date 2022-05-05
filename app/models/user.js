const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { type } = require("express/lib/response");

var schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    repeat_password: {type: String},
    address: [{
      hNum: { type: Number },
      area: { type: String },
      pinCode: { type: Number },
      state: { type: String },
    }],
    images: [{
      fieldname: {type: String},
      originalname:{type: String},
      mimetype:{type: String},
      path: {type: String}
     }]
  },
  { timestamps: true }
);

schema.pre('save', async function (next) {

  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword

    }
    next()
  } catch (error) {
    next(error)

  }
})


schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model("user", schema);

module.exports = User







// var countrySchema = mongoose.Schema(
//   {
//      userId: Number,
//      country: String,
//      city: String
//   }
// )

// const Country = mongoose.model("country", countrySchema);
