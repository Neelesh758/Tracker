import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises"
import User from "../model/user.model.js";


///Upload

export const uploadProfileImage = async (req,res) => {
  try {
    //Taking Inputs
    const {id} = req.params;

    //If File not rcvd
    if(!req.file){
      return res.status(400).json({message:"no Files Uploaded"})
    }

    const result = await cloudinary.uploader.upload(req.file.path,{
      folder : "profile_Images"
    });

    await fs.unlink(req.file.path);

    //Updating Database
    const user = await User.findByIdAndUpdate(
      id,
      {image : result.secure_url},
      {new:true}
    )
    //Sending res
    res.status(200).json({
      message:"Uploaded Successfully",
      image : user.image
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Unable to Upload "})
  }
}