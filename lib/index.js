// lib/index.js

const helper = require('./helper');
const Providers = require('./models/providers');


function greet(name) {
    return helper.createGreeting(name);
}

module.exports = {
    greet,
    Providers
};