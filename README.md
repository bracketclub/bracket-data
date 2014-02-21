bracket-data
============

[![Build Status](https://travis-ci.org/tweetyourbracket/bracket-data.png?branch=master)](https://travis-ci.org/tweetyourbracket/bracket-data)

![Testling CI badge](https://ci.testling.com/tweetyourbracket/bracket-data.png)

## What is a bracket?

From [wikipedia](http://en.wikipedia.org/wiki/Bracket_(tournament)):

> A bracket is a tree diagram that represents the series of games played during a tournament, named as such because it appears to be a large number of interconnected (punctuational) brackets.

But if you're going to use this, you probably already know that :).


## What does this module do?

Let's say you like writing code, and you like brackets, and then one day you want to write some code about brackets. Well, you'll probably need some data first. `bracket-data` aims to have all that data for you, as well as some helpers to make it easier to interact with.


### Do you have X sport for Y year?

Probably not, but it's only a pull request away! All the data lives in JSON files under the `./data` dir. To add a sport/year combination:

1. Add a directory with the name of the sport (if it doesn't already exist)
2. Add a `defaults.json` file for that sport (if it doesn't already exist)
3. Add a file `YYYY.json` inside the sport directory

Right now the valid properties are:

- `scoring`: an object with properties that could be used to score the bracket
- `order`: an array of the orders in which seed would play each other in the first round
- `finalRegion`: an object with a `name` and `id` property for the final region (could be Final Four, NBA Finals, etc)
- `regions`: an array of objects each with the properties `id`, `name`, and `fullname`. These are order dependent and the regions that play each other to get to the `finalRegion` should be at indexes `0,1` and `2,3` (in a 4 region bracket).
- `teams`: an object where the keys are the `id`s from `regions` and the properties are an array of team names in seed order
- `locks`: a date string representing when the bracket "locks" aka when picks should no longer be allowed because the games have started

These properties are merged recursively (using `[lodash's merge](http://lodash.com/docs#merge)`) with the properties from `defaults.json` being overwritten by the properties from `YYYY.json`. This allows for things to don't change often (such as the `order`) to only be written in one place, whereas things such as `teams` which change every year to be located in the appropriate file.


## Node vs Browser

To use this module in Node, just require it like an other module and follow the API, easy. For the record, that would look like:

```js
var BracketData = require('bracket-data');
```

To use it in a browser, I recommend using [browserify](http://browserify.org/), but there are a few caveats. If you are using this in the browser, you probably don't want to include the data for every year and sport. There is a build step in the repo, that will take all sport/year combinations and output a prebuilt file to `./built/SPORT-YYYY.js`. This isn't necessary when using node, where we can do dynamic requires, but browserify can't parse those. So to use the `2013` data from the `ncaa-mens-basketball` tournament, you can do:

```js
var BracketData = require('bracket-data/built/ncaa-mens-basketball-2013');
```


## What data is there?

`bracket-data` can provide the following helpers:

- `bracket`: an object structured to have each region with the necessary properties such as `id`, `teams`, `name`, `fullname` and `sameSideAs`.
- `regex`: a regular expression that can be used to match a string representation of the bracket
- `constants`: an object with a number of constant values of the bracket such as `REGION_COUNT` and `TEAMS_PER_REGION`
- `order`: an array with the first round team order
- `scoring`: any data from the json files about how to possible score a bracket
- `locks`: a date string of when the bracket locks


## API

Make a new `bracket-data` object like this (the year and sport options are required):

```js
var BracketData = require('bracket-data'); // Or use a specific year from ./built

var bracketData = new BracketData({
    year: '2013',
    sport: 'ncaa-mens-basketball'
});

console.log(bracketData.bracket.regions.MW.teams);
```

By default, only the `bracket` option will be returned. To opt-in to more properties use the `props` option:

```js
var BracketData = require('bracket-data'); // Or use a specific year from ./built

var bracketData = new BracketData({
    year: '2013',
    sport: 'ncaa-mens-basketball',
    props: ['bracket', 'regex']
});

console.log(bracketData.regex);
```

## Contributing

Feel free to open any pull requests or issues. This is the basis of [tweetyourbracket.com](tweetyourbracket.com), but outside of that, no one has used it. If there is a way to make this better, I am eager to hear it.

## Anything else?

If this is interesting to you, I think you should follow me ([@lukekarrys](https://twitter.com/lukekarrys)) and [@tweetthebracket](https://twitter.com/tweetthebracket) on Twitter. There are also a lot of other bracket related modules on our [GitHub organization page](https://github.com/tweetyourbracket).

### LICENSE

MIT