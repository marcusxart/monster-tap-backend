const EventEmitter = require('events');
const emailService = require('./emailService');
const eventEmitter = new EventEmitter();

// Event listener for 'email' events
eventEmitter.on('email', async (user, template, subject, otp = null) => {
  const date = new Date();
  const year = date.getFullYear();
  const email = user.email;

  const welcomeEmail = {
    from: 'Bitwave FX <merchant@checkretail.tech>',
    to: email,
    subject,
    template, 
    context: {
      email,
      otp,
      date: date,
      year: year,
    },
  };

  // Send the email
  await emailService.sendMail(welcomeEmail);
});

module.exports = eventEmitter;
