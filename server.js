import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import turfRoutes from './routes/turf_routes.js';
import bookingRoutes from './routes/booking.route.js';

dotenv.config();
connectDB();

const app= express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/turfs',turfRoutes);
app.use('/api/bookings',bookingRoutes);

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});