const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Omogućite CORS samo za specifičnu domenu
app.use(cors({
    origin: 'https://cvecedolece.000webhostapp.com',
}));

app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { firstName, lastName, address, phone, email, napomena, products } = req.body;

    if (!products || !Array.isArray(products)) {
        res.status(400).json({ message: "Invalid 'products' data" });
        return;
    }

    const sendtomail = 'apatinsll@gmail.com'

    const messageText = `\nNova porudžbina od ${firstName} ${lastName}.\nProizvodi: ${products.join(', ')}.\nemail: ${email}\nBroj telefona: ${phone}\nAdresa: ${address}\nNAPOMENA: ${napomena}`;
    const userMessage = `Poštovani,\nporudzbina je uspesno primnjena.\nOčekujte telefonski poziv na broj ${phone} radi potvrde.\n`;

    // Ispiši poruku pre slanja e-maila
    console.log('Poruka koja će biti poslata na', sendtomail, '\n---------------------------------',messageText, '\n---------------------------------\n');
    console.log('User poruka\n---------------------------------\n',userMessage, '\n---------------------------------\n');

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'srdjandelic02@gmail.com', 
            pass: 'kuizvclmgexqtrng', 
        },
    });

    const mailOptions = {
        from: 'srdjandelic02@gmail.com',
        to: 'apatinsll@gmail.com',
        subject: 'Nova porudžbina',
        text: messageText,
    };

    const userMail = {
        from: 'srdjandelic02@gmail.com',
        to: ['apatinsll@gmail.com', email],
        subject: 'Cveće Doleće porudžbina',
        text: userMessage,
    };

    try {
        // Koristite Promise.all da pošaljete oba e-maila u isto vreme
        await Promise.all([transporter.sendMail(mailOptions), transporter.sendMail(userMail)]);
        res.json({ message: 'E-mailovi su uspešno poslati' });
    } catch (error) {
        res.status(500).json({ message: 'Došlo je do greške pri slanju e-mailova', error: error.message });
    }

});

const PORT = process.env.PORT || 3000; // Port koji želite koristiti
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});
