import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app= express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{console.log("Connecting to:", process.env.MONGO_URI);

    res.send("API is running...");
});

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('Server running on port ${PORT}');
});