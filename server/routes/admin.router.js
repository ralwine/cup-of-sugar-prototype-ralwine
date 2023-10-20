const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const nodemailer = require('nodemailer');



// POST Route
router
    .post('/', (req, res) => {
        console.log('in admin router:', req.body)
        const
            [email_address, email_subject, email_text]
                =
                [req.body.user_email, req.body.subject, req.body.message];
        console.log('body:', req.body.email_address, req.body.email_subject, req.body.email_text)
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        console.log('transporter', transporter)

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email_address,
            subject: email_subject,
            text: email_text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }); // END POST Route

module.exports = router;