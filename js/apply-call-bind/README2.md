###call and apply

<blockquote>
The Apply and Call methods are two of the most often used Function methods in JavaScript, and for good reason: they allow us to borrow functions and set the this value in function invocation. In addition, the apply function in particular allows us to execute a function with an array of parameters, such that each parameter is passed to the function individually when the function executes—great for variadic functions; a variadic function takes varying number of arguments, not a set number of arguments as most functions do.  <a href="http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/">from javascript is sexy</a>  
</blockquote>

    var avgScore = "global avgScore";
    function avg (arrayOfScores) {
        var sumOfScores = arrayOfScores.reduce (function (prev, cur, index, array) {
            return prev + cur;
        });
        this.avgScore = sumOfScores / arrayOfScores.length;
    }
    var gameController = {
        scores  :[20, 34, 55, 46, 77],
        avgScore:null​,
        players :[
            {name:"Tommy", playerID:987, age:23},
            {name:"Pau", playerID:87, age:33}
        ]
    }
    avg (gameController.scores);
    console.log (window.avgScore); // 46.4​
    console.log (gameController.avgScore); // null​
    ​
    avgScore = "global avgScore";
    ​
    avg.call (gameController, gameController.scores);
    console.log (window.avgScore); //global avgScore​
    console.log (gameController.avgScore); // 46.4​

Functions like `avg` are global, `this` is window unless you call them with a different context. This code allows you to call a global function and have `this.aveScore` be the `gameControllers avgScore`

If you want to call the `avg` function and have it set the object `gameControllers` `avgScore` variable to be the average, then you have to use `call` to set the context for `avg`'s `this.avgScore` to `gameControllers` `avgScore` 