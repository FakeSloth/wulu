export default hide;

function hide() {
  let commands = {
    show(target, room, user) {
      if (!this.can('lock')) return false;
      user.hiding = false;
      user.updateIdentity();
      this.sendReply('You have revealed your staff symbol.');
    },

    hide(target, room, user) {
      if (!this.can('lock')) return false;
      user.hiding = true;
      user.updateIdentity();
      this.sendReply('You have hidden your staff symbol.');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
