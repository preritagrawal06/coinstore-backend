const { default: axios } = require("axios");

const sendOTPViaPhone = async (phone, otp) => {
  try {
    const { data } = await axios.post("https://backend.oneapi.in/sms/sendotp", {
      apiKey: process.env.OTP_API_KEY,
      brandName: "Shadow Company",
      customerName: "Dear Shadow Company user",
      number: phone,
      otp: otp,
    });
    return data
  } catch (error) {
    throw error
  }
};

module.exports = sendOTPViaPhone
