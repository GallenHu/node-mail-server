const response = require('../../../utils/response');
const transport = require('./transport');

module.exports = {
  index: async (ctx, next) => {
    const transporter = transport.createTransport();

    if (transporter instanceof Error) {
      ctx.body = response.makeResponse.error(transporter.message);
      return;
    }

    const requestMethod = String(ctx.request.method).toLowerCase();

    let fromName = process.env.MAIL_USER;
    let to = ''
    let title = 'Untitled';
    let content = 'empty'
    if (requestMethod === 'get') {
      const { query } = ctx.request;
      if (query.from) fromName = query.from;
      if (query.to) to = query.to;
      if (query.title) title = query.title;
      if (query.content) content = query.content;
    }
    if (requestMethod === 'post') {
      const { body } = ctx.request; // x-www-form-urlencoded
      if (body.from) fromName = body.from;
      if (body.to) to = body.to;
      if (body.title) title = body.title;
      if (body.content) content = body.content;
    }

    if (!to) {
      ctx.body = response.makeResponse.error('required param `to` not found!');
      return
    }

    try {
      const info = await transporter.sendMail({
        from: `"${fromName}" <${process.env.MAIL_USER}>`,
        to,
        subject: title,
        html: content,
      });
      ctx.body = response.makeResponse.success(info.messageId);
    } catch (err) {
      console.error(err);
      ctx.body = response.makeResponse.error(err);
    }
  },
};
