const validatePhoneNumber = (phoneNumber) => {
    // Define the regex for 10-digit phone number
    const phoneRegex = /^\d{10}$/;
  
    // Test the phone number against the regex
    return phoneRegex.test(phoneNumber);
};

module.exports = validatePhoneNumber