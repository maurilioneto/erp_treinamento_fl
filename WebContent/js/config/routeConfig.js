angular.module("listaTelefonica").config(function ($routeProvider){
	$routeProvider.when("/cor", {
		templateUrl: "view/cor.html",
		controller: "corController",
	});
	
	$routeProvider.when("/categoria", {
		templateUrl: "view/categoria.html",
		controller: "categoriaController",
	});

	$routeProvider.when("/marca", {
		templateUrl: "view/marca.html",
		controller: "marcaController",
	});

	$routeProvider.when("/tamanho", {
		templateUrl: "view/tamanho.html",
		controller: "tamanhoController",
	});

	$routeProvider.when("/unidadeDeMedida", {
		templateUrl: "view/unidadeDeMedida.html",
		controller: "unidadeDeMedidaController",
	});
	
	$routeProvider.otherwise({redirectTo: "/index.html"});
});