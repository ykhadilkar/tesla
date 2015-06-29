gunzip medical_index_mapping.json.gz
elasticdump --input=medical_index_mapping.json --output=http://$TEXTDB_1_ENV_TUTUM_SERVICE_HOSTNAME:9200/medical --type=mapping 
gunzip medical_index_data.json.gz
elasticdump --input=medical_index_data.json --output=http://$TEXTDB_1_ENV_TUTUM_SERVICE_HOSTNAME:9200/medical --type=data