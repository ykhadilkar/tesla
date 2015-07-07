gunzip medical_index_mapping.json.gz
elasticdump --input=medical_index_mapping.json --output=http://$TEXTDB_1_PORT_9200_TCP_ADDR:9200/medical --type=mapping 
gunzip medical_index_data.json.gz
elasticdump --input=medical_index_data.json --output=http://$TEXTDB_1_PORT_9200_TCP_ADDR:9200/medical --type=data