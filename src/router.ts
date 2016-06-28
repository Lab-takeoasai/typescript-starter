import ChatsCtrl from "./chat/chats.controller";
import ChatDetailCtrl from "./chat/chatDetail.controller";
import DashCtrl from "./dashboard/dashboard.controller";
import AccountCtrl from "./account/account.controller";

angular.module("router", ["ionic"])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state("tab", {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:

      .state("tab.dash", {
        url: "/dash",
        views: {
          "tab-dash": {
            templateUrl: "templates/tab-dash.html",
            controller: DashCtrl,
            controllerAs: "$ctrl",
          }
        }
      })

      .state("tab.chats", {
        url: "/chats",
        views: {
          "tab-chats": {
            templateUrl: "templates/tab-chats.html",
            controller: ChatsCtrl,
            controllerAs: "$ctrl",
          }
        }
      })
      .state("tab.chat-detail", {
        url: "/chats/:chatId",
        views: {
          "tab-chats": {
            templateUrl: "templates/chat-detail.html",
            controller: ChatDetailCtrl,
            controllerAs: "$ctrl",
          }
        }
      })

      .state("tab.account", {
        url: "/account",
        views: {
          "tab-account": {
            templateUrl: "templates/tab-account.html",
            controller: AccountCtrl,
            controllerAs: "$ctrl",
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/tab/dash");

  });
