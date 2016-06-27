export default class ChatController {
  public chats;
  constructor($scope, apiUrl, private Chats) {
    "ngInject";
    this.chats = Chats.all();

    console.log(apiUrl);
  }

  public remove(chat) {
    this.Chats.remove(chat);
  };
}
