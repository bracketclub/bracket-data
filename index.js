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
var _defaults = require('lodash-node/modern/objects/defaults');
var _each = require('lodash-node/modern/collections/forEach');
var _omit = require('lodash-node/modern/objects/omit');
var data = require('./data/index');


function Bracket(options) {
    _defaults(options, {
        props: ['bracket'],
        year: new Date().getFullYear(),
        sport: 'ncaa-mens-basketball',
        defaults: {}
    });

    var bracketData = data(options.sport, options.year);

    _each(options.props, function (prop) {
        if (options.defaults.hasOwnProperty(prop)) throw new Error('Cant set default for an existing property');
        this[prop] = typeof methods[prop] === 'function' && methods[prop](bracketData);
    }, this);

    _defaults(this, _omit(options, ['props', 'year', 'sport'].concat(options.props)), options.defaults || {});
}

module.exports = Bracket;
