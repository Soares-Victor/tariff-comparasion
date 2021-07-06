FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db tariff --collection products --type json --file /init.json --jsonArray