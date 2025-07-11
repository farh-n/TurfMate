import jwt from 'jsonwebtoken';

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(404).json({message:"Please provide token"});
    }
    const token =authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        userId=decoded.id;
        next();
    }catch(error){
        res.status(401).json({error:"Invalid or Expired Token"});
    }

};
export default verifyToken;
