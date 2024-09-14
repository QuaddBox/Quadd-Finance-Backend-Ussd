import { TbdexHttpClient } from "@tbdex/http-client";
import { DidDht } from '@web5/dids'

// Create a Decentralized Identifier (DID) for a user
export async function createDid() {
  const customerDid = await DidDht.create({
    options: { publish: true },
  });
  return customerDid.uri;
}

// Fetch Offerings from PFI
export async function getOfferings(pfiDid) {
  return await TbdexHttpClient.getOfferings({ pfiDid });
}

// Create RFQ (Request for Quote)
export async function createRfq(customerDid, offering, amount, credentials) {
  const rfq = Rfq.create({
    metadata: {
      to: offering.pfiDid,
      from: customerDid,
      protocol: "1.0",
    },
    data: {
      offeringId: offering.id,
      payin: { kind: "USD_BANK_TRANSFER", amount },
      payout: { kind: "KES_BANK_TRANSFER", paymentDetails: {} },
      claims: credentials,
    },
  });

  await rfq.verifyOfferingRequirements(offering);
  await rfq.sign(customerDid);
  return await TbdexHttpClient.createExchange(rfq);
}
