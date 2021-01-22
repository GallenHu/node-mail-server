const nodemailer = require("nodemailer");

console.info('========');
console.info('Transport Configure:');
console.info('MAIL_HOST: ' + process.env.MAIL_HOST);
console.info('MAIL_PORT: ' + process.env.MAIL_PORT);
console.info('MAIL_SECURE: ' + String(process.env.MAIL_SECURE ? true : false));
console.info('MAIL_USER: ' + process.env.MAIL_USER);
console.info('========');

module.exports = {
  createTransport: function () {
    if (!process.env.MAIL_HOST) {
      return new Error('environment variable MAIL_HOST not found!');
    }
    if (!process.env.MAIL_USER) {
      return new Error('environment variable MAIL_USER not found!');
    }
    if (!process.env.MAIL_PASSWORD) {
      return new Error('environment variable MAIL_PASSWORD not found!');
    }

    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || undefined,
      secure: process.env.MAIL_SECURE ? true : false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }
};
