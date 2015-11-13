### exercise: isolate scope &, reference function in parent 
#### tags: ["&", "reference", "parent", "directive", "controller", "angular", "link"]
<a href="/fiddles/index.html">[back to fiddles]</a>

You can call a function notated as an attribute in the directive HTML, here `send-it`. It is connected to the scope as a reference `scope:{sendIt:'&'}`. In your directive you can call `sendIt({myparam:'obj or string'})` from the `DOM` or from `link` **but you must** call it with `send-it="sayIt(myparam)"`

    <div ng-controller="ctrl">
      <button type="button" ng-click="sayIt('fred')">test local</button>
      <input type="text" ng-model='my.firstname'></input>{{my.firstname}}<br>
      <sb-two-way send-it="sayIt(newn)"></sb-two-way>
    </div>

    <template id="t1">
      <button type="button" ng-click="sendIt({newn:'phil'})">push down</button>
      <input type="text" ng-model="my.lastname"></input>{{my.lastname}}
    </template>    