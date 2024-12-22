const nodemailer = require('nodemailer');

/**
 * Sends an email using the nodemailer package.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The content of the email.
 * @param {string} send_to - The recipient's email address.
 * @param {string} sent_from - The sender's email address.
 * @param {string} reply_to - The reply-to email address.
 */
const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    //Create Email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls:{
            rejectUnauthorized: false,
        }
    })

    //Option for sending email
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    //Send email
    transporter.sendMail(options, function (err, info){
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;