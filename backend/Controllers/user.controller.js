import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signUp = async (req,res) => {
  try {
    //Taking Inputs from user
    const {email,userName,password,securityPin} = req.body;

    //Checking Inputs
    if(!userName || !email || !password || !securityPin){
      return res.status(400).json({
        message:"Please Provide All Details"
      })
    }

    //Checking User Existence

    const existUser = await User.findOne({email},{userName});
    if(existUser){
      return res.status(400).json({
        message:"User Already Exist"
      })
    }

    //Password And Pin hashing
    const hashedPassword = await bcrypt.hash(password,10);
    const hashedPin = await bcrypt.hash(securityPin,10);

    //Creation of New User 
    const user = await User.create({
      userName,
      email,
      password:hashedPassword,
      securityPin:hashedPin,
    })

    //Sending Response 
    res.status(201).json({
      message:"SignUp Successful , Now Login !",
      user:{
        user:{
        id:user._id,
        userName:user.userName,
        email:user.email,
        isPremium:user.isPremium
       }
      }
    })
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
};

//Login Controller
export const userLogin = async (req,res) => {
  try {
    const {email , password} = req.body;

    //checking that user provides all inputs
    if(!email || !password){
      return res.status(400).json({
        message:"Please Provide All Details"
      })
    }

    //Checking User Exist or not 
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({
        message:"User Not Found"
      })
    }

    //Matchig password
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
      return res.status(400).json({
        message:"Inavlid Password"
      })
    }

    //JWT Sign

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    )

    //Sending Response
    res.status(200).json({
      message:"Login Successful",
      token,
      user
    })
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}