import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import userRoutes from "./routes/user.route.js"
import transactionRoute from "./routes/transaction.route.js"
import paymentRoutes from "./routes/payment.route.js";
import uploadRoutes from "./routes/upload.routes.js";
import cors from "cors";

//Dot env config
dotenv.config();

//Giving powers to app

const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/user",userRoutes);
app.use("/api/transactions",transactionRoute);
app.use("/api/payment",paymentRoutes)
app.use("/api/profileimg",uploadRoutes)

//Database connection
connectDb();



//Server Run
const port = process.env.PORT || 1307
app.listen(port,()=>{
  console.log(`Server is running on ${port}`)
});