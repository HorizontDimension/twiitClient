angular.module('starter.services', [])
/**
 * A guests service that queries server api
 */
    .factory("Guest", function ($resource, apiaddr) {
        guest = $resource(apiaddr + '/guest/:id', {id: '@id'},
            { search: {method: 'get', url: apiaddr + '/guest/search/:id', isArray: true}});

        return guest
    })

.factory('authInterceptor',['$rootScope','$q','$window','$location', function ($rootScope, $q, $window,$location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (response) {

            $rootScope.hide();

            if (response.status === 401) {


                $location.path('/login')
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };

}]);




