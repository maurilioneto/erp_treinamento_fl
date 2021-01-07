angular.module("listaTelefonica").config(function ($routeProvider){
	$routeProvider.when("/cor", {
		templateUrl: "view/cor.html",
		controller: "corController",
	});
	
	$routeProvider.otherwise({redirectTo: "/index.html"});
});