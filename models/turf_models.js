import mongoose from "mongoose";
const turfSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    priceperhour:{
        type:Number,
        required:true,
    },
    amenities:{
        type:[Array],
    },
    images:{
        type:[Array],
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
},
{
    timestamps:true,
},
);

const Turf=mongoose.model("Turf",turfSchema);
export default Turf; 