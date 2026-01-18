const express = require('express');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const connectToDB = require('./config/db');
const app = express();

connectToDB();
app.use(express.json());
app.use('/', userRouter);
app.use('/auth', authRouter);
module.exports = app;