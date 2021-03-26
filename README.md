# node-mail-server

Apply [nodemailer](https://nodemailer.com/) with RESTful server.

## Dev

- node >= 10.x

```sh
export MAIL_HOST=smtp.office365.com
export MAIL_PORT=587 # defaults to 587 if is secure is false or 465 if true
# export MAIL_SECURE=true # defaults to false
export MAIL_USER=example@example.com
export MAIL_PASSWORD=example
# (Optional) set api basic auth:
export AUTH_NAME=username
export AUTH_PASS=password

yarn serve

# test
curl -X POST -d 'to=example@example.com&content=<b>hello world</b>' http://localhost:3000/v1/sendmail

# with auth
curl -X POST -H "Authorization: basic dGo6dG9iaQ==" -d '$Options' http://localhost:3000/v1/sendmail
```

## Options

|  param   | explain  | example |
|  ----  | ----  | ---- |
| to     | receiver email address (required) | Jack |
| from   | sender name                       | Rose |
| title  | mail subject                      | Meeting |
| content  | mail content (support html)     | balabala... |

## Usage

> GET

http://localhost:3000/v1/sendmail?to=abc@gmail.com&title=hello

> POST

http://localhost:3000/v1/sendmail

with body:

```
{
  "to": "abc@gmail.com",
  "title": "hello"
}
```

## Docker

```
docker run -p 3000:3000 \
  --env MAIL_HOST=smtp.office365.com \
  --env MAIL_PORT=587 \
  --env MAIL_USER=abc@example.com \
  --env MAIL_PASSWORD=xxx \
  --env AUTH_NAME=name \
  --env AUTH_PASS=pass \
  --dns 8.8.8.8 \
  --name="node-mail-server" \
  -d node-mail-server
```

[docker-compose.yml](./docker-compose.yml)
