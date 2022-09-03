const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jonahkim03@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jonahkim03@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Hey ${name}, sorry to see you go! Why are you cancelling?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}