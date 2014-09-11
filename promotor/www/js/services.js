angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

    .factory("Guest", function ($resource, apiaddr) {
        guest = $resource(apiaddr + '/guest/:id', {id: '@id'},
            { search: {method: 'get', url: apiaddr + '/guest/search/:id', isArray: true}});

        return guest
    })
    .factory("Promotor", function ($resource, apiaddr) {
        promotor = $resource(apiaddr + '/promotor/:id', {id: '@id'},
            {
                inviteguest: {
                    method: 'post',
                    url: apiaddr + '/promotor/inviteguest/:id'},

                uninviteguest: {
                    method: 'post',
                    url: apiaddr + '/promotor/uninviteguest/:id'}

            });

        return promotor;
    })
    .factory("Event", function ($resource, apiaddr) {
        event = $resource(apiaddr + '/events/:id', {id: '@id'},
            { latests: {method: 'get', url: apiaddr + '/events/latests/:number', isArray: true}  });

        return event
    })

    .factory('authInterceptor', [ '$q', '$window', '$location', '$injector', function ($q, $window, $location, $injector, $ionicLoading) {
        return {
            //send the authorization bearer in every request and show loading status
            request: function (config) {

                $injector.get("$ionicLoading").show();
                config.headers = config.headers || {};
                if (window.localStorage.getItem('token')) {
                    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');
                }
                return config;
            },
            //if we got an server side error we handle it, if we got a 401 redirect to login and close loading
            responseError: function (response) {

                $injector.get("$ionicLoading").hide();
                if (response.status === 401) {

                    $location.path('/login')
                    // handle the case where the user is not authenticated
                }
                if (response.status > 500) {
                    alert("500 erro")
                }
                return response || $q.when(response);
            },
            //close the loading
            response: function (response) {
                $injector.get("$ionicLoading").hide();
                return response || $q.when(response);
            }
        };

    }]).factory('BusyService', ['$ionicLoading', function ($ionicLoading) {
        return {
            show: function (content) {
                $ionicLoading.show({
                    content: content || '<i class="ion-loading-c"></i>'
                });
            },

            hide: function () {
                $ionicLoading.hide();
            }
        };
    }]).directive('passwordMatch', [function () {
        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function (scope, elem, attrs, control) {
                var checker = function () {

                    //get the value of the first password
                    var e1 = scope.$eval(attrs.ngModel);

                    //get the value of the other password
                    var e2 = scope.$eval(attrs.passwordMatch);
                    return e1 == e2;
                };
                scope.$watch(checker, function (n) {

                    //set the form control to valid if both
                    //passwords are the same, else invalid
                    control.$setValidity("unique", n);
                });
            }
        };
    }]);
