import express from "express.js";
import User from "../models/user.js"
import bcrypt from "bcrypt.js"
import User from "../models/user.js";

const router=express.Router();

router.post('/register',async(req,res)=>{
    const {name,email,password} =req.body;
    try{
        const userExists= await User.findOne({email});
        if (userExists){
            return res.status(400).json({msg:"User already exists"});
        }
        const salt = await bcyrpt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
        });
        res.status(201).json({
            msg:"user created successfully",
            userId:newUser._id,
        });
    }catch(error){
        res.status(500),json({error:"Server Error"});
    }
});

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findone({email});
        if(!user){
            return res.status(400).json({error:"INVALID CREDENTIALS"});

        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"invalid credentials"});
        }

        const token=jwt.sign({userId: user._id},process.env.JWT_SECRET )

    } catch (error) {
        
    }
})
export default router;