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

- [API README](https://github.com/hamishhossack/recipeasy/api)
- [CLIENT README](https://github.com/hamishhossack/recipeasy/client)

## Assumptions
- Ingredients are tightly coupled with recipes
- The api is not looking to be extended further by filters
- The user is always singular "Joe", this is not a network of users
- Favourites (stars) are tightly coupled to recipes, due to the nature of the "singular user" dataset

## Getting Started

# Development Grade

Run the individual applications separately see the relevant readme's to start all three key services; api, client, db.

# Production Grade

Clone the repo:
```sh
git clone git@github.com:hamishhossack/recipeasy.git
cd recipeasy
```

**MUST DO**
Build the client app for production, see the [client readme](https://github.com/hamishhossack/recipeasy/client)

Start server in Docker with compose (for simplicity):
```sh
docker-compose up
```

> NOTE: Potential need to change the IP address to match your mongo instance (Docker or other), please change in api/server/config/env/{development,production,test}.js

## Further Development (see each project README.md)
