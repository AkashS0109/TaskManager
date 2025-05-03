
import mongoose from "mongoose";
const userSchema =  new mongoose.Schema({
    fullname:{
        type:String,
        requird:true
    },
    country:{
        type:String,
        requied:true,
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        required:true,     
    },
},{timestamps:true}); 
 const User=mongoose.model('User',userSchema);
 export default User;