import express from "express";
import { createTransaction, deleteTransaction, getTransaction, updateTransaction } from "../Controllers/transaction.controller.js";

const router = express.Router();

router.post('/create/:id',createTransaction);
router.put('/update/:id',updateTransaction);
router.delete('/delete/:id',deleteTransaction);
router.get('/get/:userId',getTransaction);
export default router;