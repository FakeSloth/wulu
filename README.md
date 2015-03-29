# wulu

Extentions and plugins for Pokemon Showdown

# Documentation

Wulu is contain in modules. Currently, there are 4 modules: `Bot`, `Mongo`,
`Commands`, and `Emoticons`.

### Mongo

Mongo contains functions to interact with a MongoDB database. The first
function `connect_database` connects to a MongoDB database. 
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

## Versioning

### 2.x.x

Stable Release of wulu. Most features implemented. Should work 100% with few 
or no bugs.

### 1.x.x

Development of wulu. This is the so called "beta" of wulu. Has a high chance 
of lots of bugs or glitches.

### 0.x.x

This is the version where the official Pokemon Showdown main repository left off at.

# License

[MIT](LICENSE)
