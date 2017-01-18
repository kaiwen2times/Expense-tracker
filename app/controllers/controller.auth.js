'use strict';
 
angular.module('Login')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', '$cookies',
    function ($scope, $rootScope, $location, AuthenticationService, $cookies)
    {
        AuthenticationService.logout();

    	$scope.login = function(isValid)
    	{
    		if(isValid)
    		{
    			AuthenticationService.login($scope.email, $scope.password)
	            .then(function(data)
	        	{
                    $scope.error = false;
                    AuthenticationService.setAuthToken(data.authToken);
                    $location.path('/');
	        	},
                function(error)
                {
                    $scope.error = true;
                });
    		}
            else
            {
                $scope.error = true;
            }
        }
        
    }]);