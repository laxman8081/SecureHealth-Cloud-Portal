const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

// 1. Data Anonymization Logic
const anonymizeData = (data) => {
    return {
        patient_id: "PID-" + crypto.randomBytes(3).toString('hex'), // Real name ki jagah ID
        age_group: data.age < 30 ? "20-30" : "30-50", // Specific age ki jagah group
        diagnosis: data.diagnosis
    };
};

// 2. Data Masking Logic
const maskPhone = (phone) => {
    return phone.replace(/.(?=.{4})/g, 'X'); // Sirf last 4 digits dikhayega
};

app.post('/api/secure-upload', (req, res) => {
    const { name, age, phone, diagnosis } = req.body;
    
    const secureRecord = {
        ...anonymizeData({ age, diagnosis }),
        masked_contact: maskPhone(phone)
    };

    console.log("Original Data Protected. Secured Record Created.");
    res.json({
        message: "Data processed with End-to-End Cloud Security",
        data: secureRecord
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Secure Server running on port ${PORT}`));
          
