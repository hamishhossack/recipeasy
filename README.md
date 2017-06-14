# Recipeasy

This project is split into 4 separate sections; api, client & db-seed. (see below). I would imagine that actually these projects are independent of each other and would otherwise live in isolated repos. But for this exercise I intend to bundle them together.

-- recipeasy
  |_ api # Here we have a self sufficient api layer serving data as json
  |_ breif # Project feature specification/requirements
  |_ client # This houses the client UI
  |_ db-seed # data to be imported into mongo instance

What you'll need to run the development environment;
- Mongo Instance (with seed data)
- gulp
- webpack
- Docker (if you choose this deployment)

## Projects

Each project has a small readme outlining commands, runners & extra information. See inside for further details.

- [API README](https://github.com/hamishhossack/recipeasy/tree/master/api)
- [CLIENT README](https://github.com/hamishhossack/recipeasy/tree/master/client)

## Assumptions
- Ingredients are tightly coupled with recipes
- The api is not looking to be extended further by filters
- The user is always singular "Joe", this is not a network of users
- Favourites (stars) are tightly coupled to recipes, due to the nature of the "singular user" dataset
- No client framework should be used to show a core understanding of Javascript

## Getting Started

Run the individual applications run independently see the relevant readme's to start all three key services; api, client, db-seed.

## Further Development (see each project README.md)
