import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router=express.Router();

router.post('/register',async(req,res)=>{
    const {name,email,password} =req.body;
    try{
        const userExists= await User.findOne({email});
        if (userExists){
            return res.status(400).json({msg:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
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
        res.status(500).json({error:"Server Error"});
    }
});

// router.post('/login',async(req,res)=>{
//     const {email,password}=req.body;
//     try {
//         const user=await User.findOne({email});
//         if(!user){
//             return res.status(400).json({error:"INVALID CREDENTIALS"});

//         }

//         const isMatch=await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.status(400).json({error:"invalid credentials"});
//         }

//         const token=jwt.sign({id: user._id},process.env.JWT_SECRET);
//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });

//     } catch (error) {
//         res.status(500).json({error:'Server Error'});
//     }
// });
// export default router;

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received:", email); // 👈 Debug

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");
      return res.status(500).json({ error: 'Server config error' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;