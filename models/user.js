import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    did: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    // currency: {
    //     type: String,
    //     enum: ['NGN', 'KES', 'GHS']
    // },
    balance: {
        type: Number,
        default: 0,
    },
    credentials: [String]
    // verifiableCredential: {
    //     type: String,
    //     required: true,
    // },
    // transactions: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Transaction'
    // }]
}, { timestamps: true });

// Create and export the model
const User = mongoose.model('User', UserSchema);

// Export the model as default
// export default User;
export const findOne = async (query) => { 
    return await User.findOne(query);
};

export const findById = async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };


  export default User;