FROM node:0.12

EXPOSE 3000

RUN mkdir -p /var/tesla-api

COPY . /var/tesla-api

WORKDIR /var/tesla-api

RUN rm -rf node_install && npm install -g nodemon && npm install

CMD ["nodemon", "index.js"]
