require("dotenv").config();
require("express-async-errors");
const express = require('express')
const app = express();

//security
const helmet = require("helmet");
const cors = require('cors');
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

//security and configuration
// app.set('trust proxy', 1);
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}))

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//database connection
const connectDB = require('./DB/connect');

//Middlewares
const authenticator = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");

// routes
const authRouter = require("./routes/auth");
const tasks = require("./routes/task");
const user = require("./routes/user");

// ** test route 
app.get('/', (req, res) => {
  res.send("Hello from Express server");
})

app.use('/api/v1/auth',authRouter);
app.use("/api/v1/task",authenticator ,tasks);
app.use('/api/v1/user',authenticator ,user);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
}

start();