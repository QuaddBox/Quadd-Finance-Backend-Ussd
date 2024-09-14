// services/userService.js
const User = require('../models/user');
const tbDexSDK = require('@tbdex/http-client');  // Placeholder for tbDEX SDK

class UserService {
  async registerUser(data) {
    const user = new User(data);
    user.walletAddress = await tbDexSDK.createWallet();
    await user.save();
    return user;
  }

  async getBalance(phone) {
    const user = await User.findOne({ phone });
    if (!user) throw new Error('User not found');
    return await tbDexSDK.getBalance(user.walletAddress);
  }

  async transferFunds(fromPhone, toPhone, amount) {
    const fromUser = await User.findOne({ phone: fromPhone });
    const toUser = await User.findOne({ phone: toPhone });

    if (!fromUser || !toUser) throw new Error('User not found');

    await tbDexSDK.transfer(fromUser.walletAddress, toUser.walletAddress, amount);

    return { success: true };
  }
}

module.exports = new UserService();
