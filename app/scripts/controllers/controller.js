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
    let vm = this;

    function setDefault() {
      vm.input = '0';
      vm.history = [];
      vm.result = '';
      vm.lastOperator = '';
    }

    vm.operation = function (val) {
      vm.input = vm.input === '0' ? val : '' + vm.input + val;
    };

    function getOperationLabel(operator) {
      let label;
      switch (operator) {
        case "+":
          label = 'add';
          break;
        case "-":
          label = 'subtract';
          break;
        case "*":
          label = 'multiply';
          break;
        case "/":
          label = 'division';
          break;
        default:
          label = 'modulo';
          break;
      }
      return label;
    }

    function getNumbers(strInput) {
      let split = strInput.trim().split(/(\d+)/);
      let nums = [];
      split.forEach(function (item) {
        if (item && !isNaN(item)) {
          nums.push(item);
        }
      });
      return nums;
    }

    vm.calculate = function (operator) {
      if (operator) {
        vm.input = vm.input + operator;
        let strInput = vm.input.toString();
        if (strInput.substring(0, strInput.length - 1) !== operator) {
          let nums = getNumbers(strInput);
          let secondNum = nums[1] ? nums[1] : '0';
          $http.get(SERVER_URL + '/calculator?firstNum=' + nums[0] + "&secondNum=" + secondNum + "&operation=" + getOperationLabel(operator)).then(function (response) {
            vm.input = vm.result ? response.data.result : vm.input;
            vm.result = response.data.result;
            vm.history = response.data.history;
          }).catch(function (error) {
            console.log('error occured while calling calculator service', error);
          });
        }
      }
    };

    vm.showHistory = function () {
      $http.get(SERVER_URL + '/calculator/history').then(function (response) {
        vm.input = '0';
        vm.result = '';
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
