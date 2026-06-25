// Injectable no-op logger for advent-module-models.
//
// This module is a Mongoose-schema LIBRARY required (directly or transitively)
// by every service AND by advent-module-shared. Because advent-module-shared
// itself requires advent-module-models, we MUST NOT require advent-module-shared
// here (that would create a circular dependency). So we cannot build a Pino
// logger inside this library.
//
// Instead we expose an injectable logger that is a no-op by default. A host app
// (a service) can inject its own logger — typically the Pino logger created via
// advent-module-shared's createLogger — through setLogger(). The library's own
// code logs through the SAME shape Pino uses: logger.level({ ...fields }, 'msg'),
// so once a real logger is injected the output is structured and the injected
// logger's redaction/obfuscation applies to any sensitive fields passed here.
//
// See advent-docs "Logging Refactor Plan (Pino).md" §6 (Task 5).

// Default: a logger whose methods do nothing. Keeps the library silent and
// dependency-free unless a host opts in.
const noop = () => {};
const noopLogger = {
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
};

// The currently-active logger. Module-local so every file that does
// `const logger = require('../logger')` shares the same injected instance.
let active = noopLogger;

// Proxy object the library actually logs through. We delegate to `active` at
// call time (not bind once) so a setLogger() call after this module is required
// still takes effect everywhere.
const logger = {
    debug: (...args) => active.debug(...args),
    info: (...args) => active.info(...args),
    warn: (...args) => active.warn(...args),
    error: (...args) => active.error(...args),
};

// Inject a host logger (e.g. a service's Pino logger). Pass nothing / a falsy
// value to reset back to the silent no-op default.
function setLogger(externalLogger) {
    active = externalLogger || noopLogger;
}

module.exports = logger;
module.exports.setLogger = setLogger;
module.exports.noopLogger = noopLogger;
