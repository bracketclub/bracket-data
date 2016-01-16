var bracketData = require('../lib/index');
var assert = require('assert');

describe('Bracket Data', function () {
    it('should have correct data for ncaa-mens-hockey', function () {
        var b = bracketData({
            year: '2013',
            sport: 'ncaamh'
        });

        assert.strictEqual(b.constants.REGION_COUNT, 4);
        assert.strictEqual(b.constants.FINAL_ID, 'FF');
        assert.strictEqual(b.constants.ALL_IDS.join(' '), 'E MW W NE FF');
        assert.strictEqual(b.constants.FINAL_NAME, 'Frozen Four');
        assert.strictEqual(b.constants.UNPICKED_MATCH, 'X');
        assert.strictEqual(b.constants.TEAMS_PER_REGION, 4);
    });
});
