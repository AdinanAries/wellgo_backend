const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = (req, res, next) => {
    // Test
    const msg = {
        to: 'm.adinan@yahoo.com',
        from: 'adinanaries@outlook.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    res.send("Email works!");
}

module.exports = {
    sendEmail
}