'use strict';

var calcResponse = {
  "result": "30",
  "history": ["10+20+30=60", "10-5=5", "9*9+9=90"]
};

var historyResponse = {
  "history": ["10+20+30=60", "10-5=5", "9*9+9=90"]
};

angular.module('calculatorAppMock', ['ngMockE2E']).run(function ($httpBackend) {

  $httpBackend.whenGET(/\.html/).passThrough();

  //var SERVER_URL = 'http://localhost:8080/calculator/expression';

  //var statusOk = (typeof statusCode !== 'undefined') ? statusCode : 200;
  var contentTypeJson = {"content-type": "application/json"};

  $httpBackend.whenGET('http://localhost:8080\/calculator\/expression\/10+20').respond(200, calcResponse, contentTypeJson);
  $httpBackend.whenGET('http://localhost:8080\/calculator\/history').respond(200, historyResponse, contentTypeJson);
});
