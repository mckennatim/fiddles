#### code explanation

        scope: {
            inarr: "=",
            outval: "&",
            astr: "@"
        },
isolates scope, limiting interaction with the outer world to 'inarr' and 'outval' 

'=' creates 2way data binding (now frowned upon) even though this directive does not alter 'inarr'. However, if inarr is coming from an async call for data then using '=' will bring the data in even if it is not there when the directive is initailly rendered. 

"&" exports the result of the directive back out to the world; in this case the selected value gets sent back into the enclosing scope. 'outval' delivers an object to a method of the outer scope, in this case the 'valIs()' method of the 'ctrl' scope.

from the directive:

        link: function(scope, element, attrs){
            scope.valChoice = function(val){
                scope.outval({val: val})
                console.log(val)
            }
        }
through the element and to the ctrl:

    $scope.valIs = function(val){
        console.log(val)
    }

"@" delivers an attribute string through the scope. Here 

    <sb-dd inarr=inarr outval="valIs(val)" astr="my dog has fleas"></sb-dd>

astr is an attribute. That attribute can also be delivered through attrs:

        link: function(scope, element, attrs){
            scope.bstr = attrs.astr.split(' ')
        }

where in this case the attrs.astr string is converted into an array using split.       