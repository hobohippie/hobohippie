require('dotenv').config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async createPayment(req, res) {
    const { amount } = req.body;// amount is in the smallest currency unit ($0.01)

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });

      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};
