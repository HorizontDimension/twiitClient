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

    .controller('AddToNextEvent', function ($scope, $ionicLoading, apiaddr, Guest, $location) {
        $scope.apiaddr = apiaddr;
        $scope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: '<i class="ion-loading-c"></i>'
            });
        };
        $scope.hide = function () {
            $scope.loading.hide();
        };
        $scope.results = [];

        $scope.updateSearch = function (searchvalue) {

            if (searchvalue == "")
                return;
            $scope.show();

            Guest.search({id: searchvalue}, function (response, headers) {

                $scope.results = response

                $scope.hide()
            }, function (errorResponse) {

                $scope.hide()


            })

        }
    })
    .controller("addUserToEvent",function($scope){



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
    }) .controller('events.calendar',function ($scope, $http) {


    })
    .controller('events.read',function ($scope, $http,$routeParams) {
        $scope.event={}

        $http({method: 'GET', url: '/events/'+$routeParams.id}).
            success(function(data, status, headers, config) {
                $scope.event = data;
                $scope.Date=prettyDate("2008-01-28T20:24:17Z");

            }).
            error(function(data, status, headers, config) {
                $scope.event = {}
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    });
