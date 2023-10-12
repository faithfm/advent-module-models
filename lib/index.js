// lib/index.js

const helper = require('./helper');
const Providers = require('./models/provider');


function greet(name) {
    return helper.createGreeting(name);
}

module.exports = {
    greet,
    Providers
};