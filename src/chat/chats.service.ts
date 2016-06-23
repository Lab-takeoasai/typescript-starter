export default class Chats {
  // Some fake testing data
  private chats = [{
    id: 0,
    name: "Ben Sparrow",
    lastText: "You on your way?",
    face: "img/ben.png"
  }, {
      id: 1,
      name: "Max Lynx",
      lastText: "Hey, it\'s me",
      face: "img/max.png"
    }, {
      id: 2,
      name: "Adam Bradleyson",
      lastText: "I should buy a boat",
      face: "img/adam.jpg"
    }, {
      id: 3,
      name: "Perry Governor",
      lastText: "Look at my mukluks!",
      face: "img/perry.png"
    }, {
      id: 4,
      name: "Mike Harrington",
      lastText: "This is wicked good ice cream.",
      face: "img/mike.png"
    }];

  constructor($http) {
    "ngInject";
  }

  public all() { return this.chats; }
  public remove(chat) {
    this.chats = this.chats.splice(this.chats.indexOf(chat), 1);
  }
  public get(chatId: number) {
    for (let i = 0; i < this.chats.length; i++) {
      if (this.chats[i].id === Number(chatId)) {
        return this.chats[i];
      }
    }
    return null;
  }
}
