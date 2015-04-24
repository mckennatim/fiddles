var sbSel= angular.module('sbSel', [])
//<sb-sel inarr=dd.inarr outval="valIs(val)" ></sb-sel>
sbSel.directive('sbSel', function(){
	return{
		restrice: "E",
		scope: {
			inarr: "=",
			outval: "&"
		},
		templateUrl: "sb_mod/sbSel/sb-sel.html",
		controller: function($scope){
		},
		link: function(scope, element, attrs){
			scope.valChoice = function(val){
				scope.outval({val: val})
			}
		}
	}
})
