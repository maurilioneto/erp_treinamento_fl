angular.module("listaTelefonica").directive("uiCurrency", function ($filter) {
	return {
		require: "ngModel",
		link: function (scope, element, attrs, ctrl) {
			var _formatDate = function (currency) {
				if (!currency) return currency;
				currency = currency.replace(/[^0-9]+/g, "");
				if(currency.length > 2) {
					currency = currency.substring(0,currency.length-2) + "," + currency.substring(currency.length-2);
				}
				return currency;
			};

			element.bind("keyup", function () {
				ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
				ctrl.$render();
			});

			ctrl.$parsers.push(function (value) {
				return parseFloat(value.replace(',','.'));
			});
		}
	};
});