import express from "express";
import { createCheckoutSession, verifyPayment } from "../Controllers/payment.controller.js";

const router = express.Router();

router.post("/checkout",createCheckoutSession);
router.post("/verify-payment",verifyPayment);

export default router;