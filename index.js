var methods = {
        bracket: require('./bracket'),
        constants: require('./constants'),
        regex: require('./regex'),
        order: require('./order'),
        scoring: require('./scoring'),
        locks: require('./locks'),
    },
    _defaults = require('lodash-node/modern/objects/defaults'),
    _each = require('lodash-node/modern/collections/forEach'),
    _omit = require('lodash-node/modern/objects/omit'),
    _keys = require('lodash-node/modern/objects/keys');


function Bracket(options, defaults) {
    options || (options = {});
    _each(methods, function (val, key) {
        this[key] = options[key] || val(options.year);
    }, this);
    _defaults(this, _omit(options, _keys(methods)), defaults || {});
}

module.exports = Bracket;