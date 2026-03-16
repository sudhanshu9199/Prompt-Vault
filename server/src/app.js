const express = require('express');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const connectToDB = require('./config/db');
const promptRouter = require('./routes/prompt.routes');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error.middleware');
const cors = require('cors');
const app = express();

connectToDB();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/', userRouter);
app.use('/auth', authRouter);
app.use('/prompts', promptRouter);
app.use(errorHandler);

module.exports = app;