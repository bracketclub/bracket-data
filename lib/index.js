var assign = require('lodash/assign');
var methods = {
    bracket: require('./bracket'),
    constants: require('./constants'),
    regex: require('./regex'),
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

module.exports = function (o) {
    if (typeof window !== 'undefined') {
        throw new Error('To use this module in the browser you need to require ' + 
            'the specific sport/year file that you want.\nIt looks like you ' +
            'might want require("bracket-data/browser/' + o.sport + '-' + o.year + '") instead');
    }

    var bracketData = assign(
        {},
        require('../data/' + o.sport + '/defaults.json'),
        require('../data/' + o.sport + '/' + o.year + '.json')
    );
    var output = {};

    Object.keys(methods).forEach(function (prop) {
        output[prop] = methods[prop](bracketData);
    });

    return output;
};
