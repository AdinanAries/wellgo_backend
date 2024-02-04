const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = (req, res, next) => {
    try{
        const msg = {
            to: req?.body?.to,
            from: 'adinanaries@outlook.com',
            subject: req?.body?.subject,
            text: req?.body?.text,
            html: req?.body?.html,
        };
        let sent = sgMail.send(msg);
        res.status(201).send(sent);
    }catch(e){
        console.log(e);
        res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    sendEmail
}