const auth = require('koa-basic-auth');
const corsRelated = require('./cors');
const bodyParser = require('koa-bodyparser');
const config = require('../config');

module.exports = (app) => {
  app.use(corsRelated());
  app.use(bodyParser());
  if (process.env.AUTH_NAME && process.env.AUTH_PASS) {
    console.info('========');
    console.info('Auth Configure:');
    console.info('AUTH_NAME: ' + process.env.AUTH_NAME);
    console.info('AUTH_PASS: ' + process.env.AUTH_PASS);
    console.info('========');

    app.use(auth({ name: process.env.AUTH_NAME, pass: process.env.AUTH_PASS }));
  }
  app.userConfig = config;
};
