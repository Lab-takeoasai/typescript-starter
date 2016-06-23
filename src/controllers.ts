import ChatsCtrl from "./chat/chats.controller";

angular.module("starter.controllers", [])

  .controller("DashCtrl", function ($scope) {
    // empty
  })

  .controller("ChatsCtrl", ChatsCtrl)

  .controller("ChatDetailCtrl", function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller("AccountCtrl", function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
