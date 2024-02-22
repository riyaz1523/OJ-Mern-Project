import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import problemRoutes from './routes/problem.route.js'
import compilerRoutes from './routes/compiler.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import DBConnection from './DB/db.js';
dotenv.config();

DBConnection();

const __dirname = path.resolve();

const app = express();


app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/problem', problemRoutes);
app.use('/compiler', compilerRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


// app.use(express.urlencoded({ extended: true }));



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

