import Turf from "../models/turf_models.js";
import express from "express";

const router=express.Router();

//create a turf

router.post("/",async(req,res)=>{
    try{
        const turf=await Turf.create(req.body);
        res.status(201).json({
            message:"Turf created successfully",turf,
        });
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

//get all turfs
router.get("/",async(req,res)=>{
    try{
        const allTurfs=await Turf.find();
        res.status(201).json(allTurfs);
    }
    catch(err){
        res.status(500).json
    }
    
});

//get one turf
router.get("/:id",async(req,res)=>{
    try{
        const turf=await Turf.findById(req.params.id);
        if(!turf){
            return res.status(404).json({error:"Turf not found"});
        }
        res.status(201).json(turf);
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

//update a turf
router.put("/:id",async(req,res)=>{
    try{
        const updatedTurf=await Turf.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!updatedTurf){
            return res.status(404).json({error:"Turf not found"});
        } 
        res.status(200).json({message:"Turf updated successfully",updatedTurf});
    }catch(error){
        res.status(400).json({error:error.message});
    }
    
});

//delete a turf
router.delete("/:id",async(req,res)=>{
    try{
        const deletedTurf=await Turf.findByIdAndDelete(req.params.id);
        if(!deletedTurf){
            return res.status(404).json({error:"Turf not found"});
        } 
        res.status(200).json({message:"Turf deleted successfully",deletedTurf});
    }catch(error){
        res.status(400).json({error:error.message});
    }
    
});

export default router;