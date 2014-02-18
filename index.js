var methods = {
        bracket: require('./lib/bracket'),
        constants: require('./lib/constants'),
        regex: require('./lib/regex'),
        order: function (data) {
            return data.order;
        },
        scoring: function (data) {
            return data.scoring;
        },
        locks: function (data) {
            return data.locks;
        }
    },

    _defaults = require('lodash-node/modern/objects/defaults'),
    _each = require('lodash-node/modern/collections/forEach'),
    _omit = require('lodash-node/modern/objects/omit'),
    _pick = require('lodash-node/modern/objects/pick'),
    _extend = require('lodash-node/modern/objects/assign'),
    _keys = require('lodash-node/modern/objects/keys'),

    data = require('./data/index');


function Bracket(options) {
    _defaults(options, {
        props: ['bracket'],
        year: new Date().getFullYear(),
        sport: 'ncaa-mens-basketball'
    });

    var bracketData = data(options.sport, options.year);

    _each(options.props, function (prop) {
        this[prop] = typeof methods[prop] === 'function' && methods[prop](bracketData);
    }, this);

    _defaults(this, _omit(options, ['props', 'year', 'sport'].concat(options.props)), options.defaults || {});
}

module.exports = Bracket;