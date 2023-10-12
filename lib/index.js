// lib/index.js

const helper = require('./helper');
const Providers = require('./models/providers');
const Ambassadors = require('./models/ambassadors');
const Mailboxes = require('./models/mailboxes');
const Places = require('./models/places');
const Tasks = require('./models/tasks');
const Accounts = require('./models/accounts');

function info() {
    return "Advent Services Models " + this.version();
}
function version(){
    return "1.0";
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