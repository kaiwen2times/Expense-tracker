'use strict';

// declare modules
angular.module('Login', []);
angular.module('Home', []);
angular.module('Transaction', []);
angular.module('Authentication', []);

angular.module('Expensify', [
    'Login',
    'Authentication',
    'Transaction',
    'Home',
    'ngRoute',
    'ui.bootstrap',
    'ngCookies'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
    .when('/login', {
        controller: 'LoginController',
        templateUrl: 'views/login.html'
    })

    .when('/', {
        controller: 'HomeController',
        templateUrl: 'views/home.html'
    })

    .otherwise({ redirectTo: '/' })
}])

.run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http)
{
    $rootScope.$on('$locationChangeStart', function (event, next, current)
    {
        if ($location.path() !== '/login' && !$cookies.get('authToken'))
        {
            $location.path('/login');
        }
    });
}]);
