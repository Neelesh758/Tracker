import stripe from "../config/stripe.js";
import User from "../model/user.model.js";

export const createCheckoutSession = async (req,res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:[
        {
          price_data:{
            currency:"inr",
            product_data:{
              name:"Premium Membership"
            },
            unit_amount:100
          },
          quantity:1
        }
      ],
      mode:"payment",

      success_url:`${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${process.env.CLIENT_URL}/cancel`
    })

    res.status(200).json({url:session.url})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error in Creating Session"})
  }
}

export const verifyPayment = async (req,res) => {
  try {
    const {session_id} = req.body;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if(session.payment_status === "paid"){
      const userId = session.metadata.userId;
      await User.findByIdAndUpdate(userId,{
        isPremium:true
      })
      return res.json({ message: "Payment verified" });
    }
    res.status(400).json({ message: "Payment not completed" });
  } catch (error) {
    console.log(error)
  }
}