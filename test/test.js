// test/test.js

const assert = require('assert');
const myLib = require('../lib');

assert.strictEqual(myLib.greet('World'), 'Hello, World!');
console.log('All tests passed!');