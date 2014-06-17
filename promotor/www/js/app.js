// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource', 'angularMoment'])

    .run(function ($ionicPlatform, amMoment) {
        amMoment.changeLanguage('pt');
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }).config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.AddToNextEvent', {
                url: '/AddToNextEvent',
                views: {
                    'tab-AddToNextEvent': {
                        templateUrl: 'templates/addguesttoevent.html',
                        controller: 'AddToNextEvent'
                    }
                }
            })
            .state('tab.events', {
                url: '/events',
                views: {
                    'tab-events': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.AddToSelectedEvent', {
                url: '/AddToSelectedEvent',
                views: {
                    'tab-AddToSelectedEvent': {
                        templateUrl: 'templates/AddToSelectedEvent.html',
                        controller: 'AddToSelectedEvent'
                    }
                }
            })
            .state('tab.newguest', {
                url: '/newguest',
                views: {
                    'tab-newguest': {
                        templateUrl: 'templates/newguest.html',
                        controller: 'NewGuest'
                    }
                }
            }).state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'Login'

            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/AddToNextEvent');

    }).value("apiaddr", "http://guestlist.twiit.pt");

