// lib/index.js
const packageJson = require('../package.json');
const Providers = require('./models/providers');
const Ambassadors = require('./models/ambassadors');
const Mailboxes = require('./models/mailboxes');
const Places = require('./models/places');
const Tasks = require('./models/tasks');
const Accounts = require('./models/accounts');

function info() {
    return packageJson.name + " " + this.version();
}
function version(){
    return packageJson.version;
}

module.exports = {
    info,
    version,
    Providers,
    Ambassadors,
    Mailboxes,
    Places,
    Tasks,
    Accounts
};