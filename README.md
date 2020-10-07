# Where the fuck are my books?

The REST API for _Where the fuck are my books?_

## Developing

### Prerequisites

- Node 12+
- A running instance of MongoDB

### Getting started

- Clone this repo
- Run `npm install` in the repo directory
- Ensure you have a Mongo server running
- Ensure the mongo connection string in [the config](./config/default.json) is correct
- Run `npm run watch`

## Scripts

- `npm run build` Runs the TypeScript compiler
- `npm run rebuild` Removes the `dist` directory and runs the TypeScript compiler
- `npm run watch` Starts the server in watch mode, i.e. it will restart when a change is made to a `.ts` file.
- `npm run pretty` Runs the Prettier code formatter to check for issues. Will output a human-readable error if errors are found
- `npm run pretty:fix` Runs Prettier and fixes any issues that are found.
- `npm run postinstall` A post-install script that runs to update the config from the JSON file.

## Gotchas

This repo is set up with Git hooks such that you cannot commit broken code. If you encounter an error when trying to commit, run `npm run pretty` and correct the errors.

Dependencies may change, so always run `npm install` when changing branches or pulling.
