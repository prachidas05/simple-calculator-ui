'use strict';

/**
 * @ngdoc overview
 * @name calculatorApp
 * @description
 * # calculatorApp
 *
 * Main module of the application.
 */
angular.module('calculatorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).constant('ConfigurationService', function (){
  return {
    APP_NAME: 'SimpleCalculator',
    //URL_get_recipies: '/calculator',
    //LABEL_CLIENT_ERROR: "Total Client Errors (4xx)",
    //LABEL_SERVER_ERROR: "Total Server Errors (4xx)",
    //LABEL_RESPONSE_OK: "Total Responses OK (200)"
  };
});

