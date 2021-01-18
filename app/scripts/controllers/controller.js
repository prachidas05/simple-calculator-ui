'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calculatorApp
 */
angular.module('calculatorApp')
  .controller('MainCtrl', ['$http', function ($http) {
    //externilize this property in prod code
    const SERVER_URL = 'http://localhost:8080';
    var vm = this;

    function setDefault(){
      vm.input = '0';
      vm.history = [];
      vm.result = '';
    }

    vm.operation = function (val) {
      vm.input = vm.input === '0' ? val : '' + vm.input + val;
    };

    vm.calculate = function () {
      $http.get(SERVER_URL + '/calculator/expression/' + vm.input).then(function (response) {
        vm.result = response.data.result;
        vm.history = response.data.history;
        //vm.input='0';
      }).catch(function (error) {
        console.log('error occured while calling calculator service', error);
      });
    };

    vm.showHistory = function () {
      $http.get(SERVER_URL + '/calculator/history').then(function (response) {
        vm.input='0';
        vm.result='';
        vm.history = response.data.history;
        //vm.input='0';
      }).catch(function (error) {
        console.log('error occured while calling calculator service', error);
      });
    };

    vm.clearAll = function () {
      setDefault();
    };

    vm.clearOne = function () {
      vm.input = vm.input.substring(0, vm.input.length - 1);
      if ((vm.input.length === 0)) {
        vm.clearAll();
      }
    };
    setDefault();
  }]);
