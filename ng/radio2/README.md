### exercise: radio control using 2-way databinding; on incoming ng-value, radio changes, on radio selection incoming ng-value is altered
#### tags: ["two way", "databinding", "two way databinding", "radio", "ng-repeat", "ng-model", "ng-value"]
<a href="/fiddles/index.html">[back to fiddles]</a>

    <div ng-controller="ctrl">
      <input type="text" ng-model='my.incoming'></input>{{my.incoming}}<br>
      <label ng-repeat="possible in possibles" for="{{possible}}">
       {{possible}}
       <input type="radio" ng-model="my.incoming" ng-value="possible">
     </label>
    </div>