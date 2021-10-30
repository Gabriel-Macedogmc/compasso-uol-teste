FROM node:12.19.0-alpine3.10

RUN apk update && apk add bash

WORKDIR /app

ENV NODE_ENV=dev-k8s

COPY ./package.json ./
RUN npm install
COPY ./dist .
COPY ./ormconfig.js .

EXPOSE 3333

CMD ["npm", "run", "prod"]
