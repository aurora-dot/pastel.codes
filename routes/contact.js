var express = require('express');
var rate_limit = require("express-rate-limit")
const {verify} = require('hcaptcha');
const nodemailer = require('nodemailer')
var router = express.Router();

const contact_rate_limit = rate_limit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // limit each IP to 10 requests per windowMs
    message: "Too many contact requests, try again later.",
    handler: function(req, res /*, next*/) {
        res.render('error', {title:"Error", message: "Too many contact requests, try again later.", error: {status: null}})
    },
});

// POST route from contact form
router.post('/', contact_rate_limit,(req, res) => {
    const TO_GMAIL_USER = process.env.TO_GMAIL_USER
    const FROM_GMAIL_USER = process.env.FROM_GMAIL_USER
    const GMAIL_PASS = process.env.GMAIL_PASS
    const HCAPTCHA_KEY = process.env.HCAPTCHA_KEY
    const token = req.body["g-recaptcha-response"];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    verify(HCAPTCHA_KEY, token)
        .then((data) => {
            if (data.success === true) {
                // Instantiate the SMTP server
                const smtpTrans = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: FROM_GMAIL_USER,
                        pass: GMAIL_PASS
                    }
                })

                // Specify what the email will look like
                const mailOpts = {
                    from: 'Pastel.codes Contact Notifications', // This is ignored by Gmail
                    to: TO_GMAIL_USER,
                    subject: 'New message from contact form at pastel.codes',
                    text: `${req.body.firstname} ${req.body.lastname} (${req.body.email})\nsays: ${req.body.message}\n\nip: ${ip}`
                }

                // maybe send conformation email?

                // Attempt to send the email
                smtpTrans.sendMail(mailOpts, (error, response) => {
                    if (error) {
                        console.log(error)
                        res.render('error', { message: "Email did not send" }) // Show a page indicating failure
                    }
                    else {
                        res.render('contact', { message: "I will get back to you soon!", success: "Make sure the email is from ", email: TO_GMAIL_USER }) // Show a page indicating success
                    }
                })
            } else {
                // rerender with same info in the text box and show error message
                res.render('contact', { message: "Captcha failed, try again" });
            }
        })
        .catch(error => {
            console.log(error);
            res.render('contact', { message: "Something wrong happened, try again later" });
        });
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact', description: "Contact me!"});
});

module.exports = router;
