(function(){


	angular.module('app', ['ngMaterial'])

	.controller('AppController', [function(){

		var self = this;

		self.showResult = false;


		/*
			User info
		*/
		self.user = {
			postalCode : null,
			city : null,
			provider : null,
			consoMono : 3500,
			consoJour : 1600,
			consoNuit : 1900,
			consoGaz : 3500

		};


	}])

	.directive('postCode', ['ressourceService', function(ressourceService){
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, modelCtrl){

				function getCity(city){
					var index = city.indexOf("/");
					if(index != -1){
						return city.substr(0, index);
					}
					return city;
				}

				function getProvider(gas, electricity){
					return (gas == electricity) ? ' le GDR est ' + gas : 'le GDR en gaz est ' + gas + ' et celui en electricity est ' + electricity;
				}

				modelCtrl.$viewChangeListeners.push(function(){
					console.log('input changed');
					if(modelCtrl.$viewValue.length == 4){
						console.log('get postcode');
						ressourceService.get(modelCtrl.$viewValue)
						.then(
							function result(value){
								console.log(value);
								//City are sometimes in Dutch and in french "/" separated.
								//Take the first one
								scope.AppCtrl.user.city = getCity(value.netadmin_city);
								scope.AppCtrl.user.provider = getProvider(value.netadmin_name, value.netoperator);
								scope.AppCtrl.showResult = true;
							});
					} else{
						scope.AppCtrl.showResult = false;
					}
				});

			}
		};
	}]);

})();