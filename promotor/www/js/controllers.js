angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope) {
    })

    .controller('NewGuest', function ($scope, Guest) {
        $scope.user = {};

        $scope.submit = function (user) {
            u = new Guest;
            for (var p in user) u[p] = user[p];
            u.$save();
        }
    })

    .controller('AddToNextEvent', function ($scope, $rootScope, $ionicLoading, apiaddr, Guest, Event,Promotor, $location) {
        $scope.apiaddr = apiaddr;
        $scope.event = {}


        //get latest event
        Event.latests({number: 1},
            function (response, headers) {
                $scope.event = response[0]
            }, function (errorResponse) {
                console.log(errorResponse)
            })


        $rootScope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: '<i class="ion-loading-c"></i>'
            });
        };
        $rootScope.hide = function () {
            $scope.loading.hide();
        };

        $scope.addtoguest = function (userid, eventid, action) {
            Promotor.inviteguest({id:userid},angular.toJson($scope.event.Id))

        }

        $scope.results = [];

        $scope.updateSearch = function (searchvalue) {

            if (searchvalue == "") {
                $scope.results = [];
                return;
            }

            $scope.show();

            Guest.search({
                id: searchvalue
            }, function (response, headers) {

                $scope.results = response

                $ionicLoading.hide()
            }, function (errorResponse) {

                $ionicLoading.hide()


            })

        }
    })
    .controller("addUserToEvent", function ($scope) {


    }).controller("ContentController", function ($scope, $ionicSideMenuDelegate) {
        // Main app controller, empty for the example
        $scope.leftButtons = [
            {
                type: 'button-clear',
                content: '<i class="icon ion-navicon"></i>',
                tap: function (e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }
        ];
    }).controller('events.calendar', function ($scope, $http) {


    })
    .controller('events.read', function ($scope, $http, $routeParams) {
        $scope.event = {}

        $http({
            method: 'GET',
            url: '/events/' + $routeParams.id
        }).
            success(function (data, status, headers, config) {
                $scope.event = data;
                $scope.Date = prettyDate("2008-01-28T20:24:17Z");

            }).
            error(function (data, status, headers, config) {
                $scope.event = {}
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    })
    .controller('Login', function ($scope, $http, apiaddr, $window, $location) {

        console.log("teste");
        $scope.auth = {};

        console.log($window.sessionStorage.token)

        $scope.login = function (auth) {
            console.log(auth);
            $http.post(apiaddr + '/auth/login', auth).success(function (data, status, headers, config) {
                if (data.token) {
                    console.log("true")
                    $window.sessionStorage.token = data.token;
                    $location.path('/')

                }


                // this callback will be called asynchronously
                // when the response is available
            }).error(function (data, status, headers, config) {
                delete $window.sessionStorage.token;


                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }

    })

;
