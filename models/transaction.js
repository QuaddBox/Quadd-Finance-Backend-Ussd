// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // recipient: {
    //     type: String,
    //     required: true,
    // },
    amount: {
        type: Number,
        required: true,
    },
    // currency: {
    //     type: String,
    //     required: true,
    // },
    type: { 
        type: String, 
        enum: ['send', 'receive', 'fund'] 
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING',
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;