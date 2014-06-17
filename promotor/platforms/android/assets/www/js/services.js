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

        return promotor
    })
    .factory("Event", function ($resource, apiaddr) {
        event = $resource(apiaddr + '/events/:id', {id: '@id'},
            { latests: {method: 'get', url: apiaddr + '/events/latests/:number', isArray: true}});

        return event
    })

    .factory('authInterceptor', [ '$q', '$window', '$location', '$injector', function ($q, $window, $location, $injector, $ionicLoading) {
        return {
            //send the authorization bearer in every request and show loading status
            request: function (config) {

                $injector.get("$ionicLoading").show();
                config.headers = config.headers || {};
                if ($window.localStorage.getItem('token')) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
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
                if (response.status > 500){
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
    }]).directive('ionNetwork', function ($interval) {
        return {
            restrict: 'A',
            scope: {
                interval: '@?ionNetwork'
            },
            link: function (scope, element) {
                if (window.cordova) {
                    var allowedNetworkStates = [Connection.WIFI, Connection.CELL_4G, Connection.CELL_3G, Connection.CELL_2G];
                    var disabledTags = ['input', 'button', 'textarea', 'select'];
                    var tag = element[0].tagName.toLowerCase();
                    scope.interval = parseInt(scope.interval) || 3000;

                    function checkNetworkState() {
                        if (allowedNetworkStates.indexOf(navigator.connection.type) === -1) {
                            if (disabledTags.indexOf(tag) !== -1) {
                                element[0].disabled = true;
                            }
                            element.removeClass('online');
                            element.addClass('offline');
                        } else {
                            if (disabledTags.indexOf(tag) !== -1) {
                                element[0].disabled = false;
                            }
                            element.removeClass('offline');
                            element.addClass('online');
                        }
                    }

                    checkNetworkState();
                    stop = $interval(checkNetworkState, scope.interval);

                    scope.$on('$destroy', function() {
                        $interval.cancel(stop);
                    });
                }
            }
        };
    });
