const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (to, subject, htmlContent) => {
  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email: to }],
    sender: { email: 'tanmaysr019@gmail.com', name: 'Vendor Platform' },
    subject,
    htmlContent
  });

  try {
    const response = await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent:', response);
  } catch (err) {
    console.error('Email error:', err);
  }
};

module.exports = sendEmail;
