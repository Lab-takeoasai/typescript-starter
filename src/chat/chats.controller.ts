export default class ChatController {
  public chats;
  constructor($scope, private Chats) {
    "ngInject";
    this.chats = Chats.all();

    console.log("@@imgUrl//");
  }

  public remove(chat) {
    this.Chats.remove(chat);
  };
}
