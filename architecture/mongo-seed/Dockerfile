FROM mongo

COPY products.json /products.json
COPY calculations.json /calculations.json
CMD mongoimport --host mongodb --db tariff --collection products --type json --file /products.json --jsonArray \
    && mongoimport --host mongodb --db tariff --collection calculations --type json --file /calculations.json --jsonArray