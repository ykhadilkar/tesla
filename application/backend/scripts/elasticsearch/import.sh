#!/usr/bin/env bash

# create index
curl -XPUT "http://$TEXTDB_1_ENV_TUTUM_SERVICE_HOSTNAME:9200/medical/"

# create mappings
wget https://s3.amazonaws.com/reisys-manna/data/medical_index_data.json.gz
gunzip gunzip medical_index_mapping.json.gz
elasticdump --input=medical_index_mapping.json --output=http://$TEXTDB_1_ENV_TUTUM_SERVICE_HOSTNAME:9200/medical --type=mapping

# import data
wget https://s3.amazonaws.com/reisys-manna/data/medical_index_mapping.json.gz
gunzip medical_index_data.json.gz
elasticdump --input=medical_index_data.json --output=http://$TEXTDB_1_ENV_TUTUM_SERVICE_HOSTNAME:9200/medical --type=data

exit 0

