mongoimport --host db --db recipeasy-dev --collection recipes --type json --file /data.json --jsonArray;
mongoimport --host db --db recipeasy-test --collection recipes --type json --file /data.json --jsonArray;
mongoimport --host db --db recipeasy --collection recipes --type json --file /data.json --jsonArray;
