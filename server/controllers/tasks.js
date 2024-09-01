const Tasks = require('../models/task');
const {BadRequest, NotFound} = require('../errors');
const {StatusCodes} = require('http-status-codes');
const { DiLess } = require('react-icons/di');

const getAllTasks = async (req, res) =>{
  const tasks =  await Tasks.find({createdBy: req.user.userId}).sort("createdAt")

  res.status(StatusCodes.OK).json({tasks: tasks, length: tasks.length});
};

const getSingleTask = async (req, res) =>{
  const {
    user : {userId},
    params: {id: taskId}
  } = req;

  const task = await Tasks.findOne({_id: taskId, createdBy: userId});

  if(!task) throw new NotFound('Task not found');
  res.status(StatusCodes.OK).json(task);
};

const createTask = async (req, res) =>{
  req.body.createdBy = req.user.userId
  console.log(req.body)
  const newTask = await Tasks.create(req.body);
  res.status(StatusCodes.CREATED).json(newTask);
};

const deleteTask = async (req, res) =>{
  const {
    user : {userId},
    params: {id: taskId}
  } = req;

  const deletedTask = await Tasks.findByIdAndDelete({
    _id: taskId,
    createdBy: userId
  });

  if(!deletedTask) throw new NotFound(`Task not found with id ${taskId}`);

  res.status(StatusCodes.NO_CONTENT).json({msg:"task successfully deleted"});
};

const updateTask = async (req, res) =>{
  const {
    body :{title, description, deadline, tasks, priority, status},
    user : {userId},
    params: {id: taskId}
  } = req;
  if(title==="" || status==='' || deadline===""){
    throw new BadRequest("title, status, deadline are required fields");
  }
  const updatedTask = await Tasks.findByIdAndUpdate(
    {_id:taskId,createBy:userId},
    {title, description, deadline, tasks, priority, status},
    {new: true, runValidators: true}
  );
  if(!updatedTask) throw new NotFound(`Task not found with id ${taskId}`);
  res.status(StatusCodes.OK).json(updatedTask);
};

module.exports = {
  getAllTasks, 
  getSingleTask,
  createTask,
  deleteTask,
  updateTask
};










