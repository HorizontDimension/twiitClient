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
            { inviteguest: {method: 'post', url: apiaddr + '/promotor/inviteguest/:id'}});

        return promotor
    })
    .factory("Event", function ($resource, apiaddr) {
        event = $resource(apiaddr + '/events/:id', {id: '@id'},
            { latests: {method: 'get', url: apiaddr + '/events/latests/:number', isArray: true}});

        return event
    })

    .factory('authInterceptor', ['$rootScope', '$q', '$window', '$location', function ($rootScope, $q, $window, $location) {
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

/*.directive('renderCalendar', [function () {
 return {
 restrict: 'A',
 terminal : true,
 transclude : true,// The Directive is with Attribute
 link: function (scope, elem, attrs) {
 var calendar = elem.calendar(
 {
 events_source: 'http://guestlist.twiit.pt/events/calendar',
 tmpl_path: 'tmpls/',
 language: 'pt-BR',
 onAfterViewLoad: function (view) {
 $('.page-header h3').text(this.getTitle());
 $('.btn-group button').removeClass('active');
 $('button[data-calendar-view="' + view + '"]').addClass('active');
 }

 // calling the jQuery plugin method in link function for the particular DOM Element
 })

 $('.btn-group button[data-calendar-nav]').each(function () {
 var $this = $(this);
 $this.click(function () {
 calendar.navigate($this.data('calendar-nav'));
 });
 });

 $('.btn-group button[data-calendar-view]').each(function () {
 var $this = $(this);
 $this.click(function () {
 calendar.view($this.data('calendar-view'));
 });
 });

 $('#first_day').change(function () {
 var value = $(this).val();
 value = value.length ? parseInt(value) : null;
 calendar.setOptions({first_day: value});
 calendar.view();
 });

 }
 }
 }]);
 */

