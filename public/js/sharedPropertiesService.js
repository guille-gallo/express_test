var sharedProperties = angular.module('sharedProperties', []);

sharedProperties.service('sharedProperties', function () {
    
    var property = null;

    return {
        getProperty: function (value) {
            return localStorage.getItem('token');
        },
        setProperty: function(value) {
        	localStorage.setItem('token', JSON.stringify(value));
        }
    };
});