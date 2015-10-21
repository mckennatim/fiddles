###Borrowing Functions with Apply and Call (A Must Know)
<blockquote>
The most common use for the Apply and Call methods in JavaScript is probably to borrow functions. We can borrow functions with the Apply and Call methods just as we did with the bind method, but in a more versatile manner. <a href="http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/">from javascript is sexy</a>    
</blockquote>

If you want to borrow a method from another object or class (in this cae the Array class) you do it by accessing that method through its prototype and then call it on the object/class who needs to borrow it.

    var newArray = Array.prototype.slice.call (anArrayLikeObj, 0); 

another example

    console.log (Array.prototype.indexOf.call (anArrayLikeObj, "Martin") === -1 ? false : true); // true​    

One of the most popular uses of the call () and apply () methods is to extract the parameters passed into a function from the arguments object. The following example puts in `args` all the arguments after the first argument.  

    function transitionTo (name) {
        var args = Array.prototype.slice.call (arguments, 1);
    }

When you are defining a function without arguments and you call it with a bunch of arguments you can get them like so:

        function doSomething () {
        var args = Array.prototype.slice.call (arguments);
        console.log (args);
    }
    doSomething ("Water", "Salt", "Glue"); // ["Water", "Salt", "Glue"]​



####borrowing from your own objects methods
Say we had the game controller from above and we wanted to apply our `avg` function from a different object, our `appController` object. We want to borrow `appControllers` `avg` method ad use it to set the `avgScore` of our `gameController`. We can use `apply` setting the context to `gameController`

    appController.avg.apply (gameController);

####difference between call and apply

For both call and apply the first aggument is the context. In `call` the next arguments are argument to apply to the borrowed function. I `apply` the next argument is an array of arguments that it then unpacks as arguments.

####apply to Execute Variable-Arity Functions
To have a function act as though it is operating on each of its arguments when you are not sure of how many arguments you have or don't want to specify them in the function definition, you can use `apply` to send it an array that gets turned into an argument list)

    ​    var students = ["Peter Alexander","Judy Archer", "Malcolm Khan"];
        function welcomeStudents () {
            var args = Array.prototype.slice.call (arguments);
            var lastItem = args.pop ();
            console.log ("Welcome " + args.join (", ") + ", and " + lastItem + ".");
        }
        welcomeStudents.apply (null, students);
        // Welcome Peter Alexander, Judy Archer, and Malcolm Khan.    




