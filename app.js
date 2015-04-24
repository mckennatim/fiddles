var app = angular.module("App", [
	'sbSel']);

app.constant('cfg', {
	server: {
		host: window.location.host,
		pathname: window.location.pathname
	}
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
				console.log(txt)
				deferred.resolve(txt)
			}).error(function(err, status){
				deferred.reject(err)
			})
			return deferred.promise
		}
	}
}])

app.directive('sbFileList', function (Data, byTagFilter, $filter) {
	return {
		restrict: 'E',
		scope: {
			jsfile: "@"
		},
		templateUrl: "sb-file-list.html",
		link: function (scope, element, attrs) {
			console.log(Data.url)
			scope.url = Data.url;
			scope.jstr = [];
			scope.tagSet = ["--unfiltered--"];
			Data.getJs(scope.jsfile).then(function(jstr){
				console.log(jstr[3]);
				scope.jstr = $filter('orderBy')(jstr, '-type')
				console.log(scope.jstr[0])
				//scope.jstr = jstr;
				console.log(Data.getSitesWtags())
				scope.tagSet = Data.concatTags();
				console.log(scope.tagSet)
			});
			scope.applyFilter=function(val){
				scope.currTag = val;
				//scope.jstr = byTagFilter(scope.jstr, val)
			}
		}
	}
})

app.filter('byTag', function(){
	return function(input, tag){
		if (tag=="--unfiltered--"){return input}
		return input.filter(function(e){
			return (e.tags.indexOf(tag)>-1)
		})
	}
})

app.factory('Data', ['$http', '$q', 'cfg', function($http, $q, cfg){
	var fid, sitesWtags, tagSet
	console.log(cfg.server.host)
	console.log(cfg.server.pathname)
	var url ='http://'+cfg.server.host+cfg.server.pathname.replace(/index.html/, '')
	return{
		url: url,
		fid: fid,
		sitesWtags: sitesWtags,
		tagSet: tagSet,
		getJs: function(jsfile){
			var deferred =$q.defer();
			$http.get(jsfile).success(function(txt, status){
				deferred.resolve(txt)
				fid=txt
			}).error(function(err, status){
				deferred.reject(err)
			})
			return deferred.promise
		},
		getSitesWtags: function(){
			var atags = fid.filter(function(el){
				return el.tags!="undefined";
			})
			sitesWtags = atags
			return atags;
		},
		concatTags: function(){
			var etags = sitesWtags.map(function(e){
				return e.tags;
			})
			var merged =[];
			merged = merged.concat.apply(merged, etags)
			tagSet = arraySet(merged);
			tagSet.unshift("--unfiltered--")
			return tagSet
		}				
	}

}])

function arraySet(arr){
	arr = arr.sort();
	var prior = ''
	var aset = arr.filter(function(e){
		op =prior;
		prior = e;
		return (op!=e)
	})
	return aset
}