var sharedId = angular.module('sharedId', []);

sharedId.service('sharedId', function () {
    
    var property = null;

    return {
        getProperty: function () {
            return localStorage.getItem('property');
        },
        setProperty: function(value) {
        	//property = value;
        	localStorage.setItem('property', JSON.stringify(value));
        }
    };
});