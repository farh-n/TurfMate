import Booking from "../models/booking.model.js";
import express from 'express';
import verifyToken from "../middlewares/verifyToken.js";

const router=express.Router();

//create a booking
router.post('/',verifyToken,async(req,res)=>{
    try{
        const {turf,date,timeSlot,price}=req.body;
        const user=req.userId;
//check for conflicts
        const existing=await Booking.findOne({
            turf,
            date,
            timeSlot,
            status:'confirmed',
        });
        if(existing){
            return res.status(400).json({
                error:'Time slot already booked for this turf. Please choose another slot.',
            });
        }

        const booking=await Booking.create({user,turf,date,timeSlot,price});
        res.status(201).json({message:"Booking done",booking,});
    }    
    catch(error){
        res.status(500).json({error:"Server error"});
    }
});

//get all turfs

router.get('/my',verifyToken,async(req,res)=>{
    try{
        const booked=await Booking.find({user:req.userId}).populate('turf','name location priceperhour');
        res.status(200).json({
            message:"User bookings fetched Successfully",booked,
        });
    }catch(error){
        res.status(500).json({error:"Server Error"});
    }
    
});

//cancel a user booking

router.put('/cancel/:id',verifyToken,async(req,res)=>{
    const bookingId = req.params.id;
    const userId = req.userId;
    try{   
        const booking=await Booking.findOne({_id:bookingId,user:userId,});

        if(!booking){
            return res.status(404).json({error:"Booking doesnot Exist"});
        }

        if (booking.status==='cancelled'){
            return res.status(400).json({error:"Booking is already Cancelled"});
        }

        booking.status='cancelled';
        await booking.save();

        res.status(200).json({message:"Booking cancelled Successfully"});
    }catch(error){
        res.status(500).json({error:"Server Error"});
    }
})