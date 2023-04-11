const nodeMailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodeMailer.createTransport({

   service: "hotmail",
    auth: {
        user: 'fancykit@outlook.com',
        pass: 'f@ncykitpwd'
    }
});
  
    const mailOptions = {
      from: ' "Fancy kit"<fancykit@outlook.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  module.exports = sendMail;