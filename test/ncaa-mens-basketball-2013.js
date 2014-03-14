var BracketData = require('../index');
var assert = require('assert');

describe('Bracket Data', function () {
    it('should have correct data for ncaa-mens-basketball', function () {
        var b = new BracketData({
            year: '2013',
            sport: 'ncaa-mens-basketball',
            props: 'bracket constants regex order scoring locks'.split(' ')
        });

        assert.strictEqual(b.constants.REGION_COUNT, 4);
        assert.strictEqual(b.constants.FINAL_ID, 'FF');
        assert.strictEqual(b.constants.ALL_IDS.join(' '), 'MW W S E FF');
        assert.strictEqual(b.constants.FINAL_NAME, 'Final Four');
        assert.strictEqual(b.constants.UNPICKED_MATCH, 'X');
        assert.strictEqual(b.constants.TEAMS_PER_REGION, 16);
    });
});
