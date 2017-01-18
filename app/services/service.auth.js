'use strict';
 
angular.module('Authentication')
 
.factory('AuthenticationService', ['$http', '$cookies', '$q',
function ($http, $cookies, $q)
{
    var service = {};

    service.login = function(email, password)
    {
        var
        defer = $q.defer(),
        params =
        {
            'partnerPassword' : 'd7c3119c6cdab02d68d9',
            'partnerName' : 'applicant',
            'partnerUserID' : email,
            'partnerUserSecret' : password
        },
        url = 'https://crossorigin.me/https://api.expensify.com/?command=Authenticate&partnerName='+params.partnerName+
                '&partnerPassword='+params.partnerPassword+
                '&partnerUserID='+params.partnerUserID+
                '&partnerUserSecret='+params.partnerUserSecret+'&useExpensifyLogin=false';

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

    service.setAuthToken = function(auth)
    {
        $cookies.put('authToken', auth);
    }

    service.logout = function()
    {
        $cookies.remove('authToken');
    };

    return service;
}]);