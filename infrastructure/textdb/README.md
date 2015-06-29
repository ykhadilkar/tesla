# Elasticsearch Container

## Installation

### Docker

### Manual
Follow instructions here:  https://www.elastic.co/guide/en/elasticsearch/guide/current/_installing_elasticsearch.html

## Initialization

Asumming you have Elasticsearch running on localhost:9200

Use this tool: https://www.npmjs.com/package/elasticdump

**To import:**
```
wget https://s3.amazonaws.com/reisys-manna/data/medical_index_mapping.json.gz
gunzip medical_index_mapping.json.gz
elasticdump --input=medical_index_mapping.json --output=http://localhost:9200/medical --type=mapping
```
```
wget https://s3.amazonaws.com/reisys-manna/data/medical_index_data.json.gz
gunzip medical_index_data.json.gz
elasticdump --input=medical_index_data.json --output=http://localhost:9200/medical --type=data
```
**To export:**
```
elasticdump --input=http://localhost:9200/medical --output=$ --type=data | gzip > medical_index_data.json.gz
elasticdump --input=http://localhost:9200/medical --output=$ --type=mapping | gzip > medical_index_mapping.json.gz
```
