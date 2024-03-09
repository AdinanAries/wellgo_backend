const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send_email = async (payload) => {
    try{
        let sent = await sgMail.send(payload);
        res.status(201).send(sent);
    }catch(e){
        console.log(e?.response?.body?.errors);
        res.status(500).send(e);
    }
}

module.exports = {
    send_email
}