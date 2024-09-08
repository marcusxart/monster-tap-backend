const nodemailer = require('nodemailer');

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false, // Set to true if using SSL/TLS
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
  }

  async sendEmail(options) {
    const { email, subject, message } = options;

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject,
      html: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

exports.default = EmailSender;

