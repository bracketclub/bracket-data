/* eslint-env mocha */

var bracketData = require("../lib/index");
var assert = require("assert");

describe("Bracket Data", function () {
  it("should have correct data for ncaaw 2019", function () {
    var b = bracketData({
      year: "2019",
      sport: "ncaaw"
    });

    assert.strictEqual(b.constants.REGION_COUNT, 4);
    assert.strictEqual(b.constants.FINAL_ID, "FF");
    assert.strictEqual(b.constants.ALL_IDS.join(" "), "G P C A FF");
    assert.strictEqual(b.constants.FINAL_NAME, "Final Four");
    assert.strictEqual(
      b.constants.FINAL_CHAMPIONSHIP_NAME,
      "National Championship"
    );
    assert.strictEqual(b.constants.UNPICKED_MATCH, "X");
    assert.strictEqual(b.constants.TEAMS_PER_REGION, 16);
    assert.strictEqual(b.constants.BEST_OF, 1);

    assert.strictEqual(b.locks.slice(0, 4), "2019");
    assert.strictEqual(b.complete.slice(0, 4), "2019");
  });
});
