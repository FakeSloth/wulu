export default sysop;

function sysop(systemOperators=[]) {
  Users.User.prototype.hasSysopAccess = function() {
    if (systemOperators.indexOf(this.userid) > -1 && this.registered) {
      return true;
    } else {
      return false;
    }
  };
}
