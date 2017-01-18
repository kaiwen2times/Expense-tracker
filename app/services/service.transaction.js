'use strict';
 
angular.module('Transaction')
 
.factory('TransactionService', ['$http', '$rootScope', '$q',
function ($http, $rootScope, $q)
{
    var service = {};

    service.getTransactions = function(authToken)
    {
        var
        defer = $q.defer(),
        url = 'https://crossorigin.me/https://api.expensify.com/?command=Get&authToken='
                +authToken+'&returnValueList=transactionList';

        $http({url: url, method: 'GET'})
        .then(function(response)
        {
            if(response.data.jsonCode == 200)
            {
                defer.resolve(transformData(response.data.transactionList));
            }
            else
            {
                defer.reject(response.data);
            }
        },
        function(error)
        {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.createTransaction = function(params)
    {
        var
        defer = $q.defer(),
        url = 'https://crossorigin.me/https://api.expensify.com?command=CreateTransaction&authToken='
        +params.authToken+'&created='+params.created+'&amount='
        +params.amount+'&currency='+params.currency+'&merchant='+params.merchant;

        $http({url: url, method: 'GET'})
        .then(function(response)
        {
            if(response.data.jsonCode == 200)
            {
                defer.resolve(response.data);
            }
            else
            {
                defer.reject(response.data);
            }
        },
        function(error)
        {
            defer.reject(error);
        });

        return defer.promise;
    };

    function transformData(data)
    {
        var
        transform = [];

        angular.forEach(data, function(value)
        {
            var entry = {merchant: '', inserted: '', amount: 0, currency: '', created: ''};

            entry.merchant = value.merchant;
            entry.inserted = value.inserted;
            entry.amount = (value.amount)/100;
            entry.currency = value.currency;
            entry.created = value.created;
            
            transform.push(entry);
        });

        return transform;
    };

    return service;
}]);