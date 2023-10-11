// lib/index.js

const helper = require('./helper');

function greet(name) {
    return helper.createGreeting(name);
}

module.exports = {
    greet
};