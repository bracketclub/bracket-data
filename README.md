bracket-data
============

Get some helpful data for a tournament bracket.

[![NPM](https://nodei.co/npm/bracket-data.png)](https://nodei.co/npm/bracket-data/)
[![Build Status](https://travis-ci.org/bracketclub/bracket-data.png?branch=master)](https://travis-ci.org/bracketclub/bracket-data)
[![Greenkeeper badge](https://badges.greenkeeper.io/bracketclub/bracket-data.svg)](https://greenkeeper.io/)

## What is a bracket?

From [wikipedia](http://en.wikipedia.org/wiki/Bracket_(tournament)):

> A bracket is a tree diagram that represents the series of games played during a tournament, named as such because it appears to be a large number of interconnected (punctuational) brackets.

But if you're going to use this, you probably already know that :).


## What does this module do?

Let's say you like writing code, and you like brackets, and then one day you want to write some code about brackets. Well, you'll probably need some data first. `bracket-data` aims to have this data for you separated by sport and year, as well as some helpers to make it easier to interact with that data.


## API

This module can be used in Node or the browser. All of the following examples are extracting the same data.

In Node, you can require the module as normally would:

```js
// Node usage
var ncaam2013 = require('bracket-data')({
    year: '2013',
    sport: 'ncaam'
});
```

In a browser, the files are provided prebuilt so that you don't include the whole bundle.

```js
// For usage in a browser without bundling data for any other sport/year
var ncaam2013 = require('bracket-data/browser/ncaam-2013');
```

If you don't care about including all the data for every sport/year, then you can still require it normally:

```js
// Browser usage, although this bundles data for every sport/year
var ncaam2013 = require('bracket-data')({
    year: '2013',
    sport: 'ncaam'
});
```

## What data does this module give me?

Hopefully enough to display an interactive bracket. There are many other modules for doing things like explicity [validating, scoring and updating a bracket](http://github.com/bracketclub).

Here are the specific properties with examples from the `ncaam-2013` bracket. Keep in mind, that the data will change based on the number of teams in the bracket, the number of regions and which teams.

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

- `regex`: a regular expression that can be used to match [a string representation of the bracket](https://gist.github.com/lukekarrys/2028007#explanation). These string representations of brackets make up the foundation of all the bracket modules as it is how the data is stored. Here's what the final bracket looked like as a string.

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

or even as complex as the [gooley scoring method](http://seattletimes.com/html/localnews/2014497228_officepool15m.html) which [I have modeled here](https://github.com/bracketclub/bracket-data/blob/master/data/ncaam/2013.json#L26-L33).

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

*Also see the above section for further explanation about these properites or go look at a complete example: [defaults.json](https://github.com/bracketclub/bracket-data/blob/master/data/ncaam/defaults.json), [YYYY.json](https://github.com/bracketclub/bracket-data/blob/master/data/ncaam/2013.json).*


## Which sports does it have?

Currently it only has a few, but the next priority will be adding the 2014 data very quickly after it is available.

- NCAA Mens Basketball `ncaam`: `[2012, 2013, 2014, 2015, 2016, 2017, 2018]`
- NCAA Womens Basketball `ncaaw`: `[2016, 2017, 2018]`
- NHL `nhl`: `[2015, 2016, 2017]`
- NBA `nba`: `[2015, 2016, 2017]`


## Anything else?

If this is interesting to you, I think you should follow [@tweetthebracket](https://twitter.com/tweetthebracket) on Twitter. There are also a lot of other bracket related modules on our [GitHub organization page](https://github.com/bracketclub).

### LICENSE

MIT
