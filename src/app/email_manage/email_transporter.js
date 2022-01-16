const cfg = require('./email_cfg')
const nodemailer = require("nodemailer");
const user = cfg.user;
const password = cfg.password;

const sendEmail = async (email, subject, text, res) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: user,
              pass: password,
            },
            // name: 'KA Coffee',
          });
          
        let mailOptions = {
            from: user,
            to: email, 
            subject: subject,
            text: text
        }
        transporter.sendMail(mailOptions, function(error, res){
            if(error){
                throw error;
            }
            else{
                res.status(404).send(error);
            }
        });
    }
    catch(err){
        throw err;
    }
};
  
module.exports = sendEmail;