FROM node:10.18.1-alpine3.11

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3000

CMD [ "node", "app.js" ]
