const tbDexSDK = require('tbdex-sdk');

exports.processTransaction = async (senderDID, recipientPhoneNumber, amount, currency) => {
    try {
        const transaction = await tbDexSDK.executeTransaction({
            fromDID: senderDID,
            toPhoneNumber: recipientPhoneNumber,
            amount,
            currency
        });

        return transaction;
    } catch (error) {
        console.error('tbDEX Transaction Error:', error);
        return { status: 'FAILED' };
    }
};
