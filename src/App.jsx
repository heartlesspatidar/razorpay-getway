/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      const orderUrl = '/api/create-order';
      const { data } = await axios.post(orderUrl, {
        amount: amount,
        currency: 'INR',
      });

      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', 
        amount: data.amount,
        currency: data.currency,
        name: 'Test App',
        description: 'Test Transaction',
        order_id: data.id,
        handler: function (response) {
          alert('Payment successful!');
          console.log(response);
        },
        prefill: {
          name: 'Your Name',
          email: 'your-email@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log('Payment Error: ', error);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Razorpay Payment Test</h2>
      <input
        type="number"
        placeholder="Amount in INR"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default App;
