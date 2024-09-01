const USER = require('../models/user');
const {StatusCodes} = require("http-status-codes")
const {BadRequest, Unauthorized} = require("../errors");


const register = async (req, res) => {
  const {name, email, password} = req.body;

  // Null values are handled in errors handler with mongoose errors 

  const createdUser = await USER.create({...req.body})
  
  const token = createdUser.createJWT();
  
  res.status(StatusCodes.CREATED).json({
    user:{
      name:req.body.name,
      email:req.body.email,
    },
    token:token
  })
}


const login = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide credentials");
  }

  const user = await USER.findOne({email});

  if(!user){
    throw new Unauthorized("Invalid credentials");
  }

  const match = user.comparePassword(password)

  if(!match){
    throw new Unauthorized("Wrong Password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.ACCEPTED).json({
    user:{
      name:user.name,
      email:user.email,
    },
    token:token
  })

}

module.exports = {register, login};