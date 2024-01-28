const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = (req, res, next) => {
    // Test
    const msg = {
        to: 'recipient@example.com',
        from: 'sender@example.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
}

module.exports = {
    sendEmail
}