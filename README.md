# wulu [![Build Status][travis-link]][travis-img] [![Dependency Status][deps-link]][deps-img] [![devDependency Status][dev-link]][dev-img]

[travis-link]: https://travis-ci.org/FakeSloth/wulu.svg?branch=master
[travis-img]: https://travis-ci.org/FakeSloth/wulu
[deps-link]: https://david-dm.org/FakeSloth/wulu.svg
[deps-img]: https://david-dm.org/FakeSloth/wulu
[dev-link]: https://david-dm.org/FakeSloth/wulu/dev-status.svg
[dev-img]: https://david-dm.org/FakeSloth/wulu#info=devDependencies

Extentions and plugins for Pokemon Showdown

Table of Contents
-----------------

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Versioning](#versioning)
- [License](#license)

Prerequisites
-------------

<img src="http://nodejs.org/images/logos/nodejs.png" height="50"> [Node.js](http://nodejs.org)

<img src="http://www.mongodb.com/sites/mongodb.com/files/media/mongodb-logo-rgb.jpeg" height="50"> [MongoDB](http://www.mongodb.org/downloads)

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
$ git clone https://github.com/FakeSloth/wulu.git
$ cd wulu
$ npm install
```

wulu requires [MongoDB](http://www.mongodb.com). Open up
another command prompt or terminal:

```bash
$ mongod
```

Then go back to the other terminal or command prompt to start up the server:

```bash
$ node app.js
```

Documentation
-------------

Wulu is contain in modules. Currently, there are 4 modules: `Bot`, `Mongo`,
`Commands`, and `Emoticons`. In addition to `Economy`.

### Economy

To set a __currency_name__ for you Economy, do this:

```js
Wulu.Economy.currency_name = 'goats';
```

### Mongo

Mongo contains functions to interact with a MongoDB database. The first
function `connect_database` connects to a MongoDB database. It has an optional
parameter where you can put in a database url that is store elsewhere such as
[mongolab](https://mongolab.com).
`importUsergroups` and `exportUsergroups` are MongoDB replacements of the
original csv version of importUsergroups and exportUsergroups.

### Commands

Commands are modular as well. You can pick and choose which commands you would
like to use. To use all of them use the `init` command:

```js
Wulu.Commands.init();
```

This will load up all commands and merge them into `CommandParser` for you.

You can load up individual commands like this:

```js
Wulu.Commands.away();
```

Some commands have parameters for custom stuff such as the /away command. You
can pass in a string for a different /away message.

```js
Wulu.Command.away('Gaming');
```

Be sure to check more of the documentation to see what each command has to
offer.

### Bot

To create a new bot:

```js
var Bot = new Wulu.Bot();
```

Connecting the Bot to the server:

```js
Bot.connect();
```

You can pass arguments to the bot. The four parameters that it has are __name__,
__avatar__, __group__, and __rooms__.

```js
var Bot = new Wulu.Bot('Bender', 'bender.png', '&', ['global', 'lobby', 'tournaments']);
```

To join all rooms:

```js
var rooms = Object.keys(Rooms.rooms);
var Bot = new Wulu.Bot('Bender', 'bender.png', '&', rooms);
```

### Emoticons

To start using emoticons:

```js
Wulu.Emoticons();
```

You may pass in your custom emoticons:

```js
var emotes = {
  'Kappa': 'kappa.png',
  'feelsgd': 'feelsgd.png'
};
Wulu.Emoticons(emotes);
```

To make the username look like the chat when using emoticons, put this in your css:

```css
.emote-chat {
  background: none;
  border: 0;
  padding: 0 5px 0 0;
  cursor: pointer;
  font-family: Verdana;
}
```

Versioning
----------

### 2.x.x

Stable Release of wulu. Most features implemented. Should work 100% with few 
or no bugs.

### 1.x.x

Development of wulu. This is the so called "beta" of wulu. Has a high chance 
of lots of bugs or glitches.

### 0.x.x

This is the version where the official Pokemon Showdown main repository left off at.

License
-------

[MIT](LICENSE)
