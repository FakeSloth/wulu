# wulu

Extentions and plugins for Pokemon Showdown

# Documentation

Wulu is contain in modules. Currently, there are 3 modules: `Bot`, `Mongo`,
`Commands`.

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

# License

[MIT](LICENSE)
