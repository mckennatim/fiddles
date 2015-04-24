var app = angular.module("App", [
	"sbDd",
	"sbSel"]);

app.controller('ctrl', function($scope){
	var inarr = ["IIFE", "apply", "button", "closure", "directives", "document.getElement", "document.querySelectorAll", "dropdown-toggle", "oredrBy", "promises", "slice"];
	$scope.valIs = function(val){
		console.log(val)
	}
	$scope.dd = {label: "a button dropdown", inarr: inarr}	
})

app.directive('sbMd', function (md) {
	var converter = new Showdown.converter();
	return {
		restrict: 'E',
		scope: {
			mdfile: "@"
		},
		link: function (scope, element, attrs) {
			var mdText = element.text();
			if(scope.mdfile){
				md.getMd(scope.mdfile).then(function(txt){
					mdText = txt + mdText;
					convertMd(mdText)
				});
			}else{
				convertMd(mdText)
			}
			function convertMd(str){
				var htmlText = '<div class="md">'+converter.makeHtml(str) +'</div>';
				element.html(htmlText);
			}
		}
	};
});

app.factory('md', ['$http', '$q', function($http, $q){
	return{
		getMd: function(mdfile){
			var deferred =$q.defer();
			$http.get(mdfile).success(function(txt, status){
				deferred.resolve(txt)
			}).error(function(err, status){
				deferred.reject(err)
			})
			return deferred.promise
		}
	}
}])