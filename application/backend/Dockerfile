FROM node:0.12

EXPOSE 3000

RUN mkdir -p /var/tesla-api

COPY . /var/tesla-api

WORKDIR /var/tesla-api

RUN rm -rf node_install && npm install -g pm2 && npm install

RUN npm install -g elasticdump

CMD ["pm2", "start", "server.js", "--no-daemon"]