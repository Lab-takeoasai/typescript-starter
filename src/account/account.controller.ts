export default class AccountController {
  public settings;
  constructor($scope) {
    "ngInject";
    this.settings = {
      enableFriends: true
    };
  }
}
