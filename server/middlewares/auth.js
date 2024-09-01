const USER = require('../models/user');
const jwt = require("jsonwebtoken");
const {UnauthorizedError} = require('../errors')
require('dotenv').config();


const auth = (req, res, next) =>{
  const authHeader = req.headers.authorization
  
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthorizedError()
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId:payload.userId,
      name: payload.name,
      email: payload.email
    }
    next();
  } catch (error) {
    throw new UnauthorizedError()
  }

}

module.exports = auth;