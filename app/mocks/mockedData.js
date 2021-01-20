'use strict';

var calcResponse = {
  "result": "30",
  "history": ["10+20+30=60", "10-5=5", "9*9+9=90"]
};

var firstResponse = {
  "result": "5",
  "history": ["5+0=6"]
};

var historyResponse = {
  "history": ["10+20+30=60", "10-5=5", "9*9+9=90"]
};

angular.module('calculatorAppMock', ['ngMockE2E']).run(function ($httpBackend) {

  $httpBackend.whenGET(/\.html/).passThrough();

  //var SERVER_URL = 'http://localhost:8080/calculator/expression';

  //var statusOk = (typeof statusCode !== 'undefined') ? statusCode : 200;
  var contentTypeJson = {"content-type": "application/json"};
  $httpBackend.whenGET('http://localhost:8080\/calculator?firstNum=5&secondNum=6&operation=multiply').respond(200, calcResponse, contentTypeJson);
  $httpBackend.whenGET('http://localhost:8080\/calculator?firstNum=5&secondNum=0&operation=add').respond(200, firstResponse, contentTypeJson);
  $httpBackend.whenGET('http://localhost:8080\/calculator?firstNum=5&secondNum=6&operation=add').respond(200, {"result": "11","history": ["5+0=6"]}, contentTypeJson);
  $httpBackend.whenGET('http://localhost:8080\/calculator\/history').respond(200, historyResponse, contentTypeJson);
});
