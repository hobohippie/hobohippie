require("dotenv").config();
const Order = require('../models/order-model');
const Account = require('../models/account-model');
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

module.exports = {
  async createPayment(req, res) {
    const { amount, customerInfo, cartItems } = req.body;
    
    try {
      let account = await Account.findById(req.userId);
      if (!account.stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: account.email,
          name: account.name,
          metadata: {
            userId: account._id.toString()
          }
        });
        account.stripeCustomerId = customer.id;
        await account.save();
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        customer: account.stripeCustomerId,
        metadata: {
          userId: req.userId,
          orderItems: JSON.stringify(cartItems),
          email: customerInfo.email,
          address: JSON.stringify(customerInfo.address),
        },
      });

      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).send({ error: error.message });
    }
  },
  async handleWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const session = await mongoose.startSession();
        
        try {
          session.startTransaction();
          
          // Create order with correct status
          const order = new Order({
            accountId: paymentIntent.metadata.userId,
            items: JSON.parse(paymentIntent.metadata.orderItems),
            total: paymentIntent.amount / 100,
            status: 'pending', // Match enum values
            paymentIntentId: paymentIntent.id,
            customerEmail: paymentIntent.metadata.email,
            shippingAddress: JSON.parse(paymentIntent.metadata.address)
          });
          await order.save({ session });

          // Update account
          await Account.findByIdAndUpdate(
            paymentIntent.metadata.userId,
            {
              $push: {
                orders: {
                  orderId: order._id,
                  total: paymentIntent.amount / 100,
                  status: 'pending'
                }
              }
            },
            { session }
          );

          await session.commitTransaction();
          return res.json({ received: true });
        } catch (error) {
          await session.abortTransaction();
          console.error('Error processing payment success:', error);
          return res.status(500).json({ error: 'Failed to process order' });
        } finally {
          session.endSession();
        }
    }

    // Handle other event types if needed
    res.json({ received: true });
  }
};
