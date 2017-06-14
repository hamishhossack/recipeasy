mongoimport --host db --db reacipeasy-dev --collection recipes --type json --file /data.json --jsonArray;
mongoimport --host db --db reacipeasy-test --collection recipes --type json --file /data.json --jsonArray;
mongoimport --host db --db reacipeasy --collection recipes --type json --file /data.json --jsonArray;
