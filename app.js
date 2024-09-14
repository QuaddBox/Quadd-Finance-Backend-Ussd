// require("dotenv").config();
import dotenv from "dotenv";
import express, { json } from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import tbDexRoutes from "./routes/tbDexRoutes.js";

const app = express();
app.use(json());

dotenv.config();

// Connect to MongoDB
connectDB();

console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('port URI:', process.env.PORT);


// Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/tbdex", tbDexRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
