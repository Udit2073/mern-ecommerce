import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

import paymentRoutes from "./routes/paymentRoutes.js";

import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();

connectDB();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('API is running...');
});

// USER ROUTES
app.use('/api/users', userRoutes);

// PRODUCT ROUTES
app.use('/api/products', productRoutes);

// PAYMENT ROUTES
app.use("/api/payment", paymentRoutes);

// OTP
app.use(
  "/api/otp",
  otpRoutes
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});