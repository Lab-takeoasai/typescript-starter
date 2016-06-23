export default class ChatDetail {
  public chat;
  constructor($scope, $stateParams, Chats) {
    "ngInject";
    this.chat = Chats.get($stateParams.chatId);
  }
}
