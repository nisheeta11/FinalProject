// // backend/routes/PaymentRoutes.js
// const express = require('express');
// const Stripe = require('stripe');
// const dotenv = require('dotenv');

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const router = express.Router();

// router.post('/checkout', async (req, res) => {
//   try {
//     const { price, method } = req.body;

//     if (!price || !method) {
//       return res.status(400).json({ error: 'Price and payment method are required.' });
//     }

//     const amountInPaisa = Math.round(price * 100);

//     if (amountInPaisa < 50) {
//       return res.status(400).json({ error: 'Minimum payment must be at least Rs 0.50.' });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: 'inr',
//           product_data: { name: `Rs. ${price} via ${method}` },
//           unit_amount: amountInPaisa,
//         },
//         quantity: 1,
//       }],
//       mode: 'payment',
//      success_url: 'http://localhost:5173/payment-success',
// cancel_url: 'http://localhost:5173/payment-failed',

//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error('Stripe checkout session error:', error);
//     res.status(500).json({ error: 'Failed to create checkout session' });
//   }
// });

// module.exports = router;



const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/checkout', async (req, res) => {
  try {
    const { price, method } = req.body;

    if (!price || !method) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const amountInPaisa = Math.round(price * 100);

    if (amountInPaisa < 50) {
      return res.status(400).json({ error: 'Minimum payment must be at least Rs 0.50.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: `Rs. ${price} via ${method}` },
          unit_amount: amountInPaisa,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/paymentsuccess',
      cancel_url: 'http://localhost:5173/payment-failed',
    });

    res.json({ url: session.url });
  } catch {
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
