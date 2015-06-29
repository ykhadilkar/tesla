FROM node:0.12

EXPOSE 3000

RUN mkdir -p /var/tesla-api

COPY . /var/tesla-api

WORKDIR /var/tesla-api

RUN rm -rf node_install && npm install -g pm2 && npm install

RUN npm install -g elasticdump

CMD ["pm2", "start", "server.js", "--no-daemon"]

RUN wget https://s3.amazonaws.com/reisys-manna/data/medical_index_data.json.gz
RUN wget https://s3.amazonaws.com/reisys-manna/data/medical_index_mapping.json.gz

RUN gunzip medical_index_mapping.json.gz
RUN elasticdump --input=medical_index_mapping.json --output=http://$TEXTDB_1_ENV_TUTUM_SERVICE_HOSTNAME:9200/medical --type=mapping 
RUN gunzip medical_index_data.json.gz
RUN elasticdump --input=medical_index_data.json --output=http://$TEXTDB_1_ENV_TUTUM_SERVICE_HOSTNAME:9200/medical --type=data