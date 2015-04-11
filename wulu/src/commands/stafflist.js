import User from '../usergroup';
export default stafflist;

function stafflist() {
  let commands = {
    stafflist() {
      let staff = {
        '~': [],
        '&': [],
        '@': [],
        '%': [],
        '+': []
      };
      let numStaff = 0;
      User.find((err, users) => {
        if (err) return;
        users.forEach((user) => {
          if ('~&@%+'.indexOf(user.group) <= -1 && user.name === 'undefined') return;
          staff[user.group].push(user.name);
          numStaff++;
        });

        this.popupReply('Administrators:\n--------------------\n' + staff['~'].join(', ') + '\n\nLeaders:\n-------------------- \n' + staff['&'].join(', ') + '\n\nModerators:\n-------------------- \n' + staff['@'].join(', ') + '\n\nDrivers:\n--------------------\n' + staff['%'].join(', ') + '\n\nVoices:\n-------------------- \n' + staff['+'].join(', ') + '\n\n\t\t\t\tTotal Staff Members: ' + numStaff);
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}
