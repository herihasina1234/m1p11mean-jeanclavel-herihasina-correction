// dateFormattingService.js
const nodemailer = require('nodemailer');

exports.formatMonth = (monthNumber) => {
    switch (monthNumber) {
        case 1:
            return "Jan";
        case 2:
            return "Fev";
        case 3:
            return "Mar";
        case 4:
            return "Avr";
        case 5:
            return "Mai";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aou";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
        default:
            return ""; // Return empty string for unknown value
    }
};


exports.sendMail = (to, subject, content) => {
    return new Promise((resolve, reject) => {
        // Configuration du transporteur SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test@gmail.com',
                pass: 'clavs!!'
            }
        });

        // Définition des options de l'e-mail
        const mailOptions = {
            from: 'jeanclavelrandrya@gmail.com',
            to: to,
            subject: subject,
            text: content
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
                reject(error);
            } else {
                console.log('E-mail envoyé: ' + info.response);
                resolve(info);
            }
        });
    });
};