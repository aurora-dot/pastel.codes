var express = require('express');
const {verify} = require('hcaptcha');
const nodemailer = require('nodemailer')
var router = express.Router();

// POST route from contact form
router.post('/', (req, res) => {
    const TO_GMAIL_USER = process.env.TO_GMAIL_USER
    const FROM_GMAIL_USER = process.env.FROM_GMAIL_USER
    const GMAIL_PASS = process.env.GMAIL_PASS
    const HCAPTCHA_KEY = process.env.HCAPTCHA_KEY
    const token = req.body["g-recaptcha-response"];

    verify(HCAPTCHA_KEY, token)
        .then((data) => {
            console.log(data)
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
                    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
                }

                // maybe send conformation email?

                // Attempt to send the email
                smtpTrans.sendMail(mailOpts, (error, response) => {
                    if (error) {
                        console.log(error)
                        res.render('error', {message: "Email did not send"}) // Show a page indicating failure
                    }
                    else {
                        res.render('contact-success') // Show a page indicating success
                    }
                })
            } else {
                // rerender with same info in the text box and show error message
                res.render('contact', { title: 'Contact', description: "Contact me!", message: "Captcha failed, try again" });
            }
        })
        .catch(error => {
            console.log(error);
            res.render('contact', {title: 'Contact', description: "Contact me!", message: "Something wrong happened, try again later"});
        });
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact', description: "Contact me!", message: null });
});

module.exports = router;
