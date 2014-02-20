var _defaults = require('lodash-node/modern/objects/defaults');
var _each = require('lodash-node/modern/collections/forEach');
var data = require('./data/index');
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
};

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
}

module.exports = Bracket;
