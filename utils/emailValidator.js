const validateEmail = (email) => {
    // Define the regex for allowed email providers
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com)$/;
    
    // Test the email against the regex
    return emailRegex.test(email);
};

module.exports = validateEmail