FROM node:14

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

CMD ["/bin/bash", "./start-service"]