# Advent Module - Models (MongoDB)

This is a module for the Advent Services and contains the Models for MongoDB

## Installation

```bash
npm install faithfm/advent-module-models

const { Providers } = require('advent-module-models');
const { Ambassadors } = require('advent-module-models');
const { Tasks } = require('advent-module-models');
const { Places } = require('advent-module-models');
const { Mailboxes } = require('advent-module-models');
const { Accounts } = require('advent-module-models');


## Init for Husky
npx husky-init && npm install
npx husky add .husky/pre-commit "npm --no-git-tag-version version patch && git add package.json package-lock.json"
    "husky": {
        "hooks": {
            "pre-commit": "npm --no-git-tag-version version patch && git add package.json package-lock.json"
        }
    }