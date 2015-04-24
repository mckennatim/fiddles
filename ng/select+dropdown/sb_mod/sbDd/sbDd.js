var sbDd= angular.module('sbDd', [])
//	<sb-dd inarr=dd.inarr outval="valIs(val)" sblabel="{{dd.label}}" astr="my dog has fleas"></sb-dd>

sbDd.directive('sbDd', function(){
	return{
		restrice: "E",
		scope: {
			inarr: "=",
			outval: "&",//,
			astr: "@",
			sblabel: "@"
		},
		templateUrl: "sb_mod/sbDd/sb-dd.html",
		controller: function($scope){
		},
		link: function(scope, element, attrs){
			scope.valChoice = function(val){
				scope.outval({val: val})
				console.log(val)
			};
			scope.bstr = attrs.astr.split(' ')
		}
	}
})