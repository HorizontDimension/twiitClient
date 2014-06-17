angular.module('starter.controllers', [])


    .controller('NewGuest', function ($scope, Guest) {
        $scope.user = {};

        $scope.submit = function (user) {
            u = new Guest;
            for (var p in user) u[p] = user[p];
            u.$save();
        }
    })

    .controller('AddToNextEvent', function ($scope, $ionicLoading, apiaddr, Guest, Event, Promotor, $location) {
        $scope.navTitle='<img class="title-image" src="images/kidsintouchtext.png" />';
        $scope.apiaddr = apiaddr;
        $scope.event = {}
        $scope.results = [];

        //get latest event
        Event.latests({number: 1},
            function (response) {
                $scope.event = response[0]

                console.log($scope.event)

            }, function (error) {
                console.log("error")
                alert(error)

            })


        $scope.isinguest = function (event, guestid) {
            for (i = 0; i < event.GuestList.length; i++) {
                for (j = 0; j < event.GuestList[i].Guests.length; j++) {
                    if (event.GuestList[i].Guests[j] == guestid) {
                        return true;
                    }
                }
            }
            return false;
        }


        $scope.addtoguest = function (userid, eventid, action) {
            if (action) {
                Promotor.inviteguest({id: userid}, angular.toJson(eventid))
            } else {
                Promotor.uninviteguest({id: userid}, angular.toJson(eventid))
            }
            //get latest event
            Event.latests({number: 1},
                function (response) {
                    $scope.event = response[0]
                }, function (error) {
                    alert(error)
                })
        }


        $scope.updateSearch = function (searchvalue) {
            if (searchvalue == "") {
                $scope.results = [];
                return;
            }
            Guest.search({
                id: searchvalue
            }, function (response, headers) {
                $scope.results = response
            }, function (errorResponse) {
            })
        }
    })


    .controller("AddToSelectedEvent", function ($scope,$timeout,Event,apiaddr) {

        $scope.apiaddr=apiaddr;
        $scope.data = { 'numberevents' : '5' };
        $scope.events = [];
        Event.latests({number: $scope.data.numberevents},
            function (response) {
                $scope.events = response
            }, function (error) {
                alert(error)
            })




        $scope.$watch('data.numberevents', function() {
            Event.latests({number: $scope.data.numberevents},
                function (response) {
                    $scope.events = response
                    console.log(response)
                }, function (error) {
                    alert(error)
                })



        });


    })
    .controller("ContentController", function ($scope, $ionicSideMenuDelegate) {
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
    })
    .controller('Login', function ($scope, $http, apiaddr, $window, $location) {

        console.log("teste");
        $scope.auth = {};

        console.log($window.localStorage.getItem('token'))

        $scope.login = function (auth) {
            console.log(auth);
            $http.post(apiaddr + '/auth/login', auth).success(function (data, status, headers, config) {
                if (data.token) {
                    console.log("true")
                    $window.localStorage.setItem('token', data.token);
                    $location.path('/')
                }
                // this callback will be called asynchronously
                // when the response is available
            }).error(function (data, status, headers, config) {
                $window.localStorage.removeItem("token");
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    });
