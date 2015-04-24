### exercise: ng select and dropdown components, 
#### tags: ["isoloate scope & = @", "directives", "ngOptions", "select", "dropdown", "split" ]
<a href="/fiddles/index.html">[back to fiddles]</a>

Directives

    <sb-sel inarr=inarr outval="valIs(val)"></sb-sel>
    <sb-dd inarr=inarr outval="valIs(val)"></sb-dd>

are rendered from:

    <select ng-init="mval=inarr[2]"ng-model="mval" ng-options="val as val for val in inarr" ng-change="valIs(mval)"></select>


    <div class="dropdown">
        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">Button dropdown <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" role="menu">
            <li ng-repeat="val in inarr" ng-click="valIs(val)">{{val}}</li>
        </ul>
    </div>    