const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send_email = async (payload) => {
    try{
        let sent = await sgMail.send(payload);
        console.log('email sent:', sent);
        return sent;
    }catch(e){
        console.log(e);
        return {isError: true, message: e?.response?.body?.errors}
    }
}

module.exports = {
    send_email
}
