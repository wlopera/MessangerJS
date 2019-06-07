/**
 * Envio de correos por Gmail o Hotmail - nodemailer
 * 
 * @autor: william Lopera
 * @date:  Junio 2019
 * 
 * @link: https://davidjaimes.co/blog/como-enviar-emails-con-nodejs-y-nodemailer/
 */

const nodemailer = require('nodemailer');
const PropertiesReader = require('properties-reader');

const prop = PropertiesReader('config.properties');

module.exports = (form, ) => {
    
    var transporter = null;
    var from = null;
    
    if ("gmail" === prop.get('email.type')) {

        transporter = nodemailer.createTransport({
            service: prop.get('emailGmail.service'),
            auth: {
                type: 'OAuth2',
                user: prop.get('emailGmail.user'),
                clientId: prop.get('emailGmail.clientId'),
                clientSecret: prop.get('emailGmail.clientSecret'),
                refreshToken: prop.get('emailGmail.refreshToken')
            }
        });
        
        from = prop.get('emailGmail.user');

    } else {

        transporter = nodemailer.createTransport({
            service: prop.get('emailHotmail.service'),
            auth: {
                user: prop.get('emailHotmail.user'),
                pass: prop.get('emailHotmail.pass')
            }
        });

        from = prop.get('emailHotmail.user');
    }

    const mailOptions = {
        from: from,
        to: form.to,
        subject: form.subject,
        text: form.message
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return console.log("Error: ", err);
        }
        console.log("Resultado: ", info);
    });

};