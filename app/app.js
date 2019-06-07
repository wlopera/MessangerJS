var app = angular.module("App", []);
app.controller("Controller", function($scope, $http){
   
    $scope.form = {
        'to':'',
        'subject':'',
        'message':''
    };

	$scope.sendEmail = function(){
        console.log("Formulario: %o", $scope.form);
        $http.post('http://localhost:3000/api/email', $scope.form) 
        .success(function(data, status) {
            console.log("SUCESS: %o", data);
        })
        .error(function(data, status) {
            console.log("Error: %o", data);
        })
    }
});