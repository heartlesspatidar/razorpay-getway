import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
});

// Payment route
app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount: amount * 100, 
      currency,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
