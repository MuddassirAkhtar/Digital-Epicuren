// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification(phoneNumber) {
  const verification = await client.verify.v2
    .services(process.env.TWILIO_ACCOUNT_SERVICE)
    .verifications.create({
      channel: "sms",
      to: phoneNumber,
    });

  return verification.status;
}



async function createVerificationCheck(otp, phoneNumber) {
  const verificationCheck = await client.verify.v2
    .services(process.env.TWILIO_ACCOUNT_SERVICE)
    .verificationChecks.create({
      code: otp,
      to: phoneNumber,
    });

  return verificationCheck;
}



module.exports={
          createVerification,
          createVerificationCheck

}
