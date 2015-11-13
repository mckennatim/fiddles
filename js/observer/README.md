### exercise: Implement observer pattern with array of callback functions, registerObservers and notifyObservers
#### tags: ["array.forEach", "forEach", "observer", "callback", "notify", "$watch"]
<a href="/fiddles/index.html">[back to fiddles]</a><br>
<a href="http://stackoverflow.com/questions/12576798/angularjs-how-to-watch-service-variables">angularjs-how-to-watch-service-variables</a>

<blockquote style="font-style: italic; font-size:90%">
You can always use the good old observer pattern if you want to avoid the tyranny and overhead of $watch.    
</blockquote>
The observer pattern is implemented in the `o` object. It holds and array of callback functions, these are the functions that want to be called whenever something happens. they are registered and then notified. 

It is an alternative to `$watch`, that much maligned angularJs `feature` and pust the control back with the developer. Here 3 functions want to be notified and when they are, they ouptut 3 different messages to 3 different spans.
