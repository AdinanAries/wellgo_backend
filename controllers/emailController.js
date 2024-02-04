const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = async (req, res, next) => {
    try{
        const msg = {
            to: req?.body?.to,
            from: 'adinanaries@outlook.com',
            subject: req?.body?.subject,
            text: req?.body?.text,
            html: req?.body?.html,
        };
        let sent = await sgMail.send(msg);
        res.status(201).send(sent);
    }catch(e){
        console.log(e?.response?.body?.errors);
        res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    sendEmail
}