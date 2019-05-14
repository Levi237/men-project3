const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
require("dotenv").config();

require('./db/db');


const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');

console.log(process.env.MY_SECRET)

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', apiRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=>{
 next(createError(404));
});


module.exports = app;
