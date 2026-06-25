// lib/index.js
const packageJson = require('../package.json');
const { setLogger } = require('./logger');
const Providers = require('./models/providers');
const Ambassadors = require('./models/ambassadors');
const Mailboxes = require('./models/mailboxes');
const Places = require('./models/places');
const Tasks = require('./models/tasks');
const Accounts = require('./models/accounts');
const Postcodes = require('./models/postcodes');

function info() {
    return packageJson.name + " " + this.version();
}
function version(){
    return packageJson.version;
}

module.exports = {
    info,
    version,
    // Lets a host app inject its own logger (e.g. a service's Pino logger):
    //   require('advent-module-models').setLogger(serviceLogger)
    // No injection -> the library logs through a silent no-op (see lib/logger.js).
    setLogger,
    Providers,
    Ambassadors,
    Mailboxes,
    Places,
    Tasks,
    Accounts,
    Postcodes
};