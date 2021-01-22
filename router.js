const Router = require('koa-router');
const router = new Router();
const routerV1 = new Router();

const controller = {
  v1: {
    sendmail: require('./controller/v1/sendmail'),
  },
};

module.exports = (app) => {
  router.get('/', (ctx) => ctx.body = 'hello world!');

  // v1/xxx
  routerV1.get('/sendmail', controller.v1.sendmail.index);
  routerV1.post('/sendmail', controller.v1.sendmail.index);
  // 装载所有子路由
  router.use('/v1', routerV1.routes(), routerV1.allowedMethods());

  // 加载路由中间件
  app.use(router.routes()).use(router.allowedMethods());
};
