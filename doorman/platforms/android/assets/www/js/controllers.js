angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $ionicLoading, apiaddr, Guest, $location) {
    $scope.apiaddr = apiaddr;
    $rootScope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: '<i class="ion-loading-c"></i>'
        });
    };
    $rootScope.hide = function() {
        $scope.loading.hide();
    };
    $scope.results = [];

    $scope.updateSearch = function(searchvalue) {

        if (searchvalue == "") {
            return;
        }
        $scope.show();

        Guest.search({
            id: searchvalue
        }, function(response, headers) {

            $scope.results = response

            $scope.hide()
        }, function(errorResponse) {

            $scope.hide()


        })

    }
})

.controller('GuestDetailCtrl', function($scope, $rootScope, $stateParams, Guest, $ionicLoading, apiaddr) {

    Guest.get({
        id: $stateParams.Id
    }, function(response, headers) {

        $scope.guest = response
        console.log(response)
        $scope.hide();


    }, function(errorResponse) {
        alert("unable to connect to server")
        $scope.guest = [];

        $scope.hide();
    })

    $scope.apiaddr = apiaddr;

    $rootScope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: '<i class="ion-loading-c"></i>'
        });
    };
    $rootScope.hide = function() {
        $scope.loading.hide();
    };

    $scope.show();



    $scope.guest = {};


})

.controller('AccountCtrl', function($scope) {})
    .controller('Login', function($scope, $http, apiaddr, $window, $location) {

        console.log("teste");
        $scope.auth = {};

        console.log($window.sessionStorage.token)

        $scope.login = function(auth) {
            console.log(auth);
            $http.post(apiaddr + '/auth/login', auth).success(function(data, status, headers, config) {
                if (data.token) {
                    console.log("true")
                    $window.sessionStorage.token = data.token;
                    $location.path('/')

                }




                // this callback will be called asynchronously
                // when the response is available
            }).error(function(data, status, headers, config) {
                delete $window.sessionStorage.token;


                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }

    })

;