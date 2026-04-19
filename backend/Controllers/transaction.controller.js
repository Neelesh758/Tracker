import mongoose from "mongoose";
import transactionModel from "../model/transaction.model.js";
//Create 
export const createTransaction = async (req,res) => {
  try {
    //Taking inputs
    const { id } = req.params
    const {description,category,amount,type} = req.body;

    //Checking Inputs
    if(!id || !description || !category || !amount || !type){
      return res.status(400).json({"message":"Please Provide All Details"})
    }

    //Creaing Transaction
    const transaction = await transactionModel.create({
      user:id,
      description,
      category,
      amount,
      type
    });
    
    //Response sending
    res.status(201).json({
      message:"Transaction Added Successfully",
      transaction
    })
  } catch (error) {
    return res.status(500).json({mesaage:"Server Error in Creating Transaction"})
  }
}

//Update
export const updateTransaction = async (req,res) => {
  try {
    //Taking inputs
    const {id} = req.params;
    const {description,category,amount,type} = req.body;

    //Checking inputs
    if(!description || !category || !amount || !type){
      return res.status(400).json({message:"Please Provide All Details"})
    };

    //Finding And Update Transaction 
    const updatedTransaction = await transactionModel.findByIdAndUpdate(id,{
      description,
      category,
      amount,
      type
    },{new:true})

    if(!updateTransaction){
      return res.status(400).json({message:"Unknown Error"})
    }

    //Sending response
    res.status(200).json({
      message:"Updated Successfully"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({mesaage:"Server Error In Editing Transaction, Try Again "})
  }
}

//-------------------------------------------------------------------------------------------------
export const deleteTransaction = async (req,res) => {
  try {
    //Taking inputs
    const {id} = req.params

    //Deleting

    const deleted = await transactionModel.findByIdAndDelete(id)

    if(!deleted){
      return res.status(400).json({message:"Unknown Error While Deleting"})
    }
    //Sending Response

    res.status(200).json({message:"Deleted Successfully"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server Error in Deleteing , Try Again"})
  }
}

//----------------------------------------------------------------------------------------------------
export const getTransaction = async (req,res) => {
  try {
    const {userId} = req.params ;
    const transactions = await transactionModel.find({user:userId})

    if(!transactions.length){
      return res.status(404).json({message:"No Transaction Found"})
    }

    ///Sending response
    res.status(200).json({
      mesaage:"Data Fetched Successfully",
      count:transactions.length,
      transactions,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Error In Fetching Data , Try Again"})
  }
}