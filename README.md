bracket-data
============

[![NPM](https://nodei.co/npm/bracket-data.png)](https://nodei.co/npm/bracket-data/)

[![Build Status](https://travis-ci.org/tweetyourbracket/bracket-data.png?branch=master)](https://travis-ci.org/tweetyourbracket/bracket-data)

![Testling CI badge](https://ci.testling.com/tweetyourbracket/bracket-data.png)

## What is a bracket?

From [wikipedia](http://en.wikipedia.org/wiki/Bracket_(tournament)):

> A bracket is a tree diagram that represents the series of games played during a tournament, named as such because it appears to be a large number of interconnected (punctuational) brackets.

But if you're going to use this, you probably already know that :).


## What does this module do?

Let's say you like writing code, and you like brackets, and then one day you want to write some code about brackets. Well, you'll probably need some data first. `bracket-data` aims to have this data for you separated by sport and year, as well as some helpers to make it easier to interact with that data.


## What data does this module give me?

Hopefully enough to display an interactive bracket. There are many other modules for doing things like explicity [validating, scoring and updating a bracket](http://github.com/tweetyourbracket).

Here are the specific properties with examples from the `ncaa-mens-basketball-2013` bracket. Keep in mind, that the data will change based on the number of teams in the bracket, the number of regions and which teams.

- `bracket`: an object structured to have each region with the necessary properties. For example:

```js
{
  "regions": {
    "MW": {
      "name": "Midwest",
      "fullname": "Midwest Region",
      "sameSideAs": "W",
      "teams": [
        "Louisville",
        "Duke",
        "Michigan State",
        "Saint Louis",
        "Oklahoma State",
        "Memphis",
        "Creighton",
        "Colorado State",
        "Missouri",
        "Cincinnati",
        "Saint Mary's",
        "Oregon",
        "New Mexico State",
        "Valparaiso",
        "Albany",
        "North Carolina A&T"
      ],
      "id": "MW"
    },
    /* other regions... */
    "FF": {
      "id": "FF",
      "name": "Final Four"
    }
}
```

- `regex`: a regular expression that can be used to match [a string representation of the bracket](). These string representations of brackets make up the foundation of all the bracket modules as it is how the data is stored. Here's what the final bracket looked like as a string.

```
MW18124637211232121W19121361410291362929S185411371514315434E1912463721432434FFMWSMW
```

- `constants`: an object with a number of constant values of the bracket. For example:

```js
{
  "REGION_COUNT": 4,
  "REGION_IDS": [
    "MW",
    "W",
    "S",
    "E"
  ],
  "FINAL_ID": "FF",
  "ALL_IDS": [
    "MW",
    "W",
    "S",
    "E",
    "FF"
  ],
  "EMPTY": "MWXXXXXXXXXXXXXXXWXXXXXXXXXXXXXXXSXXXXXXXXXXXXXXXEXXXXXXXXXXXXXXXFFXXX",
  "FINAL_NAME": "Final Four",
  "UNPICKED_MATCH": "X",
  "TEAMS_PER_REGION": 16
}
```

- `order`: an array with the first round team order. This is useful for display purposes as it is ordered how the teams should be paired from top-to-bottom for each region to start the bracket:

```js
[1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15]
```

- `scoring`: any data from the json files about how to possibly score a bracket. There is no set format for the scoring data, and due to this fact, scoring data will vary quite a bit from sport to sport and year to year. You could even come up with your own scoring system, PR it, and then write your own module to score each bracket. It could be as simple as

```js
{
  "scoring": {
    // Each correct pick is worth one point
    "simple": 1
  }
}
```

or a pretty standard scoring system like:

```js
{
  "scoring": {
    // Each correct pick is worth as many points as the value at the index of its round
    "standard": [10, 20, 40, 80, 160, 320]
  }
}
```

or even as complex as the [gooley scoring method](http://seattletimes.com/html/localnews/2014497228_officepool15m.html) which [I have modeled here](https://github.com/tweetyourbracket/bracket-data/blob/master/data/ncaa-mens-basketball/2013.json#L26-L33).

- `locks`: a date string of when the bracket locks. Locking is when the first game of the bracket has begun and no more picks should be allowed.


## Does this have X sport for Y year?

Probably not, but it's only a pull request away! All the data lives in JSON files under the `./data` dir. To add a sport/year combination:

1. Add a directory with the name of the sport (if it doesn't already exist)
2. Add/edit a `defaults.json` file inside that sport's directory (if it doesn't already exist)
3. Add a file `YYYY.json` inside that sport's directory

Right now the **required** properties are:

- `regions`: an array of objects each with the properties `id`, `name`, and `fullname`. These are order dependent and the regions that play each other to get to the `finalRegion` should be at indexes `0,1` and `2,3` (in a 4 region bracket).
- `teams`: an object where the keys are the `id`s from `regions` and the properties are arrays of team names in seed order
- `finalRegion`: an object with a `name` and `id` property for the final region (could be Final Four, NBA Finals, etc)
- `order`: an array of the seeds ordered by who would play each other in the first round

And the following properties are **optional**:

- `scoring`: an object with properties that could be used to score the bracket
- `locks`: a date string representing when the bracket "locks" aka when picks should no longer be allowed because the games have started

These properties are merged recursively (using [`lodash's merge`](http://lodash.com/docs#merge)) with the properties from `defaults.json` being overwritten by the properties from `YYYY.json`. This allows for things that don't change often (such as the `order`) to only be written in one place, whereas things such as `teams` (which change every year) to be located in the appropriate file.

*Also see the above section for further explanation about these properites or go look at a complete example: [defaults.json](https://github.com/tweetyourbracket/bracket-data/blob/master/data/ncaa-mens-basketball/defaults.json), [YYYY.json](https://github.com/tweetyourbracket/bracket-data/blob/master/data/ncaa-mens-basketball/2013.json).*


## Which sports does it have?

Currently it only has a few, but the next priority will be adding the 2014 data very quickly after it is available.

- `ncaa-mens-basketball`: `[2012, 2013]`
- `ncaa-mens-hockey`: `[2013]`


## Node vs Browser

To use this module in Node, just require it like an other module and follow the API, easy. For the record, that would look like:

```js
var BracketData = require('bracket-data');
```

To use it in a browser, I recommend using [browserify](http://browserify.org/), but there are a few options. If you are using this in the browser, you probably don't want to include the data for every year and sport. There are pre-built files for each sport/year combination located at `./built/SPORT-YYYY.js` that exist for this purpose. It isn't necessary to use these in node, where we can do dynamic requires and where disk space is cheap, but browserify can't parse those and you might not want to send data you'll never use over the wire. So to use the `2013` data from the `ncaa-mens-basketball` tournament, you can do:

```js
var BracketData = require('bracket-data/built/ncaa-mens-basketball-2013');
```


## API

Make a new `bracket-data` object like this (the year and sport options are required):

```js
var BracketData = require('bracket-data'); // Or use a specific year from ./built

var bracketData = new BracketData({
    year: '2013',
    sport: 'ncaa-mens-basketball'
});

// Get the 12 seed for the Midwest Region
console.log(bracketData.bracket.regions.MW.teams[11]);
// Get the ID of the region that will play against the Midwest in the National Semifinal
console.log(bracketData.bracket.regions.MW.sameSideAs);
```

By default, only the `bracket` option will be returned. To opt-in to more properties use the `props` option. Props can be an array of properties or the string `all`.

```js
var BracketData = require('bracket-data'); // Or use a specific year from ./built

var bracketData = new BracketData({
    year: '2013',
    sport: 'ncaa-mens-basketball',
    props: 'all' // Get all properties
});

// Test if the regex matches the default empty bracket (it better!)
console.log(bracketData.regex.test(bracketData.constants.EMPTY));
```

## Contributing

Feel free to open any pull requests or issues. This is the basis of [tweetyourbracket.com](http://tweetyourbracket.com), but outside of that, I don't think it has gotten a lot of use. If there is a way to make this better, I am eager to hear it.

## Anything else?

If this is interesting to you, I think you should follow me ([@lukekarrys](https://twitter.com/lukekarrys)) and [@tweetthebracket](https://twitter.com/tweetthebracket) on Twitter. There are also a lot of other bracket related modules on our [GitHub organization page](https://github.com/tweetyourbracket).

### LICENSE

MIT