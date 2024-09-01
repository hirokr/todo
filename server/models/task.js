const mongoose = require('mongoose')


const TaskList = new mongoose.Schema({
  title:{
    type: 'string',
    required: [true, "please provide a title"]
  },
  status:{
    type: 'string',
    enum: ['started', 'pending', 'complete'],
    default: 'pending'
  },
  createdBy:{
    type: mongoose.Types.ObjectId,
    ref:'USER',
    required:[true, 'please provide the user']
  },
  description:{
    type: 'string',
    maxLength:120,
  },
  deadline:{
    type: 'string',
    required:true,
  },
  priority:{
    type: 'string',
    enum: ['low', 'medium', 'high'],
  },
  tasks:{
    type: ['string'],
    default: []
  }
},{timestamps:true});


module.exports = mongoose.model("Tasks", TaskList)