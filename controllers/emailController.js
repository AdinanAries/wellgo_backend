const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const constants = require('../constants');


const sendEmail = async (req, res, next) => {
    try{
        const msg = {
            to: req?.body?.to,
            from: constants.email.automated_from,
            subject: req?.body?.subject,
            text: req?.body?.text,
            html: req?.body?.html,
        };
        let sent = await sgMail.send(msg);
        res.status(201).send(sent);
    }catch(e){
        console.log(e?.response?.body?.errors);
        res.status(500).send(e);
    }
}

module.exports = {
    sendEmail
}