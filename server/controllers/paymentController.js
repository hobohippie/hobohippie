require('dotenv').config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async createPayment(req, res) {
    const { amount } = req.body; // amount is in the smallest currency unit ($0.01)
    const amountInCents = parseInt(amount * 100); 

    if (!amountInCents || amountInCents <= 0) {
      return res.status(400).send({ error: 'Invalid amount' });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
      });

      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).send({ error: error.message });
    }
  },
};
