const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config()

const UserSchema = new mongoose.Schema({
  name:{
    type:'string',
    required: [true, "Please provide name"],
    maxlength:50,
  },
  password:{
    type:'string',
    required: [true, "Please provide password"],
    minlength:6,
  },
  email:{
    type:'string',
    required: [true, "Please provide email"],
    match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'
    ],
    unique:true
  },
})

UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

UserSchema.methods.createJWT = function() {

  return jwt.sign({
    userId:this._id,
    name:this.name,
    email:this.email,
  },
  process.env.JWT_SECRET,
  {expiresIn: process.env.JWT_LIFETIME}
  )
}

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
  
}

module.exports = mongoose.model("USER", UserSchema)