'use strict';
 
angular.module('Home', ['ui.bootstrap'])
 
.controller('HomeController',
    ['$scope', '$rootScope', 'AuthenticationService', '$location', 'TransactionService', '$cookies', 'filterFilter', '$filter', '$window',
    function ($scope, $rootScope, AuthenticationService, $location, TransactionService, $cookies, filterFilter, $filter, $window)
    {
        // scope variables
        $scope.transactions = [];
        $scope.filtered = [];
        $scope.totalItems = 0;
        $scope.displayData = [];
        $scope.pageSize = 15;
        $scope.currentPage = 1;
        $scope.loading = true;
        $scope.transactionError = false;

        // scope functions
        $scope.getPage = function()
        {
            var
            begin,
            end;
            
            begin = (($scope.currentPage - 1) * $scope.pageSize);
            end = begin + $scope.pageSize;
            $scope.displayData = $scope.filtered.slice(begin, end);
        };

        $scope.pageChanged = function()
        {
            $scope.getPage(); 
        };

    	$scope.logout = function()
    	{
            $location.path('/login');
    	};

        $scope.createTransaction = function(isValid)
        {
            if(isValid)
            {
                var
                currency = [],
                params =
                {
                    authToken: $cookies.get('authToken'),
                    created: $filter('date')($scope.date, "yyyy-MM-dd"),
                    amount: $scope.amount,
                    currency: $scope.currency,
                    merchant: $scope.merchant
                };

                $scope.transactionError = false;
                TransactionService.createTransaction(params)
                .then(function(data)
                {
                    $scope.getData();;
                },
                function(error)
                {
                    $scope.transactionError = true;
                });
            }
            else
            {
                $scope.transactionError = true;
            }
        };

        $scope.$watch('searchText', function(newVal, oldVal)
        {
            if(newVal !== oldVal)
            {
                $scope.filtered = filterFilter($scope.transactions, newVal);
                $scope.totalItems = $scope.filtered.length;
                $scope.currentPage = 1;
                $scope.getPage();
            }
        });

	$scope.getData = function()
	{
        	// web service call to get data
        	TransactionService.getTransactions($cookies.get('authToken'))
        	.then(function(data)
        	{
           		$scope.transactions = data;
            		$scope.filtered= data;
            		$scope.totalItems = data.length;
            		$scope.getPage();
            		$scope.loading = false;
        	},
        	function(error)
        	{
            		alert("Whoops! Something went Wrong. Please sign in again.");
            		$location.path('/login');
        	});
       };
       $scope.getData(); 
}]);
