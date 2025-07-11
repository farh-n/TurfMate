import mongoose from "mongoose";
import User from './user.js';

const bookSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    turf:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Turf',
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    timeSlot:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','confirmed','cancelled'],
        default:'pending',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

const Booking=mongoose.model('Booking',bookSchema);
export default Booking;