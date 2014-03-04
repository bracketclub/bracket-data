var _merge = require('lodash-node/modern/objects/merge');
var data = {
    'ncaa-mens-basketball': {
        '2012': require('./ncaa-mens-basketball/2012.json'),
        '2013': require('./ncaa-mens-basketball/2013.json'),
        'defaults': require('./ncaa-mens-basketball/defaults.json')
    },
    'ncaa-mens-hockey': {
        '2013': require('./ncaa-mens-hockey/2013.json'),
        'defaults': require('./ncaa-mens-hockey/defaults.json')
    }
};

module.exports = function (sport, year) {
    var defaultData = data[sport] && data[sport].defaults || {};
    var yearData = data[sport] && data[sport][year];

    if (yearData) {
        return _merge(defaultData, yearData);
    } else {
        throw new Error('The combination of ' + sport + ' and ' + year + ' does not exist.');
    }
};
