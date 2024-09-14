const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json({}));
app.use(express.urlencoded({ extended:false}))

// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/ussd', require('./routes/ussdRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
