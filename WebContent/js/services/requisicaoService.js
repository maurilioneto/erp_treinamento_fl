app.service('requisicaoService', ['$http', function ($http) {
	/* requisitarPOST */
	this.requisitarPOST = function (pURL, param, callback) {

		$http.post( "/projetoFL/rest/" + pURL, param ).then(function(retorno){
			callback({isValid: true, data:retorno.data}) 
		}).catch(function(retorno){
			callback({isValid: false, data:retorno.data})
		});      
    }
	
	/* requisitarGET */
	this.requisitarGET = function (pURL, callback) {
    	$http.get( "/projetoFL/rest/" + pURL ).then(function(retorno){
			callback({isValid: true, data:retorno.data}) 
		}).catch(function(retorno){
			callback({isValid: false, data:retorno.data})
		});
    }
	
}]);