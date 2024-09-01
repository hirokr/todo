const USER = require("../models/user")
const {StatusCodes} = require("http-status-codes")
const {NotFound} = require("../errors")


const getUser = async (req, res) =>{
  const userId = req.params.id;
  const user = await USER.findById(userId);
  if(!user) throw new NotFound('User not found');
  res.status(StatusCodes.OK).json({name: user.name, email: user.email});
}

module.exports = getUser;