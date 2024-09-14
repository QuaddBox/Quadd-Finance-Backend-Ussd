const axios = require('axios');
const User = require('models/user');

// Fetch available PFI offerings
exports.fetchPfiOfferings = async (pfiDid) => {
  try {
    const response = await axios.get(`https://pfi-api-url.com/offerings?did=${pfiDid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching PFI offerings:", error);
    throw error;
  }
};

// Obtain credential token
exports.obtainCredentialToken = async (user) => {
  try {
    const response = await axios.get(`https://mock-idv.tbddev.org/kcc?name=${user.name}&country=${user.country}&did=${user.did}`);
    return response.data.token;
  } catch (error) {
    console.error("Error obtaining credential token:", error);
    throw error;
  }
};

// Execute transaction via PFI
exports.executeTransaction = async (phoneNumber, recipientPhone, sendCurrency, receiveCurrency, amount) => {
  const user = await User.findOne({ phoneNumber });
  const pfi = await this.selectPfi(sendCurrency, receiveCurrency);
  if (!pfi) throw new Error("No suitable PFI found.");

  const transactionData = {
    sender: user.did,
    recipient: recipientPhone,
    amount: amount,
    sendCurrency: sendCurrency,
    receiveCurrency: receiveCurrency,
    credential: user.credentialToken,
  };

  try {
    const response = await axios.post(`https://pfi-api-url.com/transactions`, transactionData);
    return response.data;
  } catch (error) {
    console.error("Error executing transaction:", error);
    throw error;
  }
};

// Select the best PFI based on criteria
exports.selectPfi = async (sendCurrency, receiveCurrency) => {
  const pfis = await this.fetchAllPfis();
  const availablePfis = pfis.filter(pfi => pfi.offerings.includes(`${sendCurrency} to ${receiveCurrency}`));
  return availablePfis[0]; // Placeholder: pick the first available PFI
};
