import  express from 'express';
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import AuthRoutes from "./routes/authRoutes.js"
import UssdRoutes from "./routes/ussdRoutes.js"


dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json({}));
app.use(express.urlencoded({ extended:false}))

// Routes
app.use('/api/auth', AuthRoutes);
// app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/ussd', UssdRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
