### exercise: blank, two way data binding in controller and directive
#### tags: ["two way", "databinding", "two way databinding", "directive", "controller", "angular"]
<a href="/fiddles/index.html">[back to fiddles]</a>

    <div ng-controller="ctrl">
      <input type="text" ng-model='my.firstname'></input>{{my.firstname}}
      <sb-two-way></sb-two-way>
    </div>