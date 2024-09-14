import { TbdexHttpClient } from '@tbdex/http-client';
// import { DidDht } from '@web5/dids'
// import User from './models/user.js';
// import Transaction from '../models/transaction.js';

// Send RFQ
export const sendRfq = async (req, res) => {
    try {
        const { customerDid, pfiDid, offeringId, payin, payout, claims } = req.body;

        // Create RFQ object
        const rfq = {
            metadata: {
                to: pfiDid, // PFI's DID
                from: customerDid, // Customer DID
                protocol: '1.0', // Version of tbDEX protocol
            },
            data: {
                offeringId: offeringId,
                payin: payin,
                payout: payout,
                claims: claims,
            },
        };

        // Verify RFQ requirements
        await rfq.verifyOfferingRequirements(offeringId);
        await rfq.sign(customerDid);

        // Send RFQ to the PFI
        await TbdexHttpClient.createExchange(rfq);
        
        res.status(200).json({ message: 'RFQ sent successfully', rfq });
    } catch (error) {
        console.error('Error sending RFQ:', error);
        res.status(500).json({ message: 'Failed to send RFQ', error: error.message });
    }
};

// Get Quote
export const getQuote = async (req, res) => {
    try {
        const { exchangeId, pfiDid, customerDid } = req.params;
        let quote = null;
        let attempts = 0;
        const maxAttempts = 30;
        const delay = 2000; // 2 seconds

        while (!quote && attempts < maxAttempts) {
            const exchange = await TbdexHttpClient.getExchange({ pfiDid, did: customerDid, exchangeId });

            quote = exchange.find((msg) => msg instanceof Quote);

            if (!quote) {
                // Wait 2 seconds before making another request
                await new Promise((resolve) => setTimeout(resolve, delay));
            }

            attempts++;
        }

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        res.status(200).json({ message: 'Quote retrieved successfully', quote });
    } catch (error) {
        console.error('Error retrieving quote:', error);
        res.status(500).json({ message: 'Failed to retrieve quote', error: error.message });
    }
};

// Place Order
export const placeOrder = async (req, res) => {
    try {
        const { customerDid, pfiDid, exchangeId } = req.body;

        // Create Order object
        const order = {
            metadata: {
                from: customerDid,
                to: pfiDid,
                exchangeId: exchangeId,
                protocol: '1.0', // Version of tbDEX protocol
            },
        };

        // Sign the Order with the customer's DID
        await order.sign(customerDid);

        // Submit the Order to the PFI
        await TbdexHttpClient.submitOrder(order);

        res.status(200).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
};
