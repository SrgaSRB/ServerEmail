const express = require('express');
const cors = require('cors'); // Dodavanje CORS-a
const nodemailer = require('nodemailer');

const app = express();
app.use(cors()); // Omogućava CORS za sve izvore
app.use(express.json());

app.post('/send-email', (req, res) => {
    const { firstName, lastName, address, phone, email, products } = req.body;

    if (!products || !Array.isArray(products)) {
        res.status(400).json({ message: "Invalid 'products' data" });
        return;
    }

    const sendtomail = ['apatinsll@gmail.com', 'vasiljevic.anastasija.1@gmail.com']

    const messageText = `\nNova porudžbina od ${firstName} ${lastName}.\nProizvodi: ${products.join(', ')}.\nemail: ${email}\nBroj telefona: ${phone}\nAdresa: ${address}`;

    // Ispiši poruku pre slanja e-maila
    console.log('Poruka koja će biti poslata na', sendtomail, ':\n---------------------------------',messageText, '\n---------------------------------\n');

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'srdjandelic02@gmail.com', 
            pass: 'kuizvclmgexqtrng', 
        },
    });

    const mailOptions = {
        from: 'srdjandelic02@gmail.com',
        to: ['apatinsll@gmail.com', 'vasiljevic.anastasija.1@gmail.com'],
        subject: 'Nova porudžbina',
        text: messageText,
    };

    try {
        transporter.sendMail(mailOptions); 
        res.json({ message: 'E-mail poslat uspešno' });
    } catch (error) {
        res.status(500).json({ message: 'Došlo je do greške pri slanju e-maila' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server radi na portu ${port}`);
});
