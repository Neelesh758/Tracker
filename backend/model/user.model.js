import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  image:{
    type:String,
  },
  password:{
    type:String,
    required:true
  },
  securityPin:{
    type:String
  },
  isPremium:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

const User = mongoose.model('User',userSchema);
export default User;