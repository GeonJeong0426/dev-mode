'use strict';

var app = angular.module('application', []);

app.controller('AppCtrl', function($scope, appFactory){
   $("#success_init").hide();
   $("#success_qurey").hide();
   $("#success_delete").hide();
   $("#success_invoke").hide();

   $scope.initAB = function(){
       appFactory.initAB($scope.abstore, function(data){
           if(data == "")
           $scope.init_ab = "success";
           $("#success_init").show();
       });
   }
   $scope.queryAB = function(){
       appFactory.queryAB($scope.walletid, function(data){
           $scope.query_ab = data;
           $("#success_qurey").show();
       });
   }
   $scope.deleteAB = function(){
        appFactory.deleteAB($scope.walletid2, function(data){
            if(data == "success")
                $scope.delete_ab = "User deleted successfully.";
            else
                $scope.delete_ab = "Error deleting user.";
            $("#success_delete").show();
        });
    }
    $scope.invokeAB = function(){
        appFactory.invokeAB($scope.abstore2, function(data){
            if(data == "")
            $scope.invoke_ab = "success";
            $("#success_invoke").show();
        });
    }
});
app.factory('appFactory', function($http){
      
    var factory = {};
 
    factory.initAB = function(data, callback){
        $http.get('/init?a='+data.a+'&aval='+data.aval).success(function(output){
            callback(output)
        });
    }
    factory.queryAB = function(name, callback){
        $http.get('/query?name='+name).success(function(output){
            callback(output)
        });
    }
    factory.invokeAB = function(args, callback){
        let sender = agrs.a;
        let receiver = args.b;
        let amount = args.c;
        $http.get('/invoke?sender=' + sender+'&receiver=' + receiver + '&amount=' + amount).success(function(output){
            callback(output);
        });
    }

    factory.deleteAB = function(name, callback){
        $http.get('/delete?name=' + name).success(function(output){
            callback(output);
        });
    }
    return factory;
 });
 