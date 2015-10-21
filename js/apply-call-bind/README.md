### exercise: bind call and apply 
#### tags: ["apply", "call", "bind", "currying", "reduce" ]
<a href="/fiddles/index.html">[back to fiddles]</a>

- <a href="http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/">from javascript is sexy</a>
- <a href="http://ryanmorr.com/understanding-scope-and-context-in-javascript/">http://ryanmorr.com/understanding-scope-and-context-in-javascript/</a>

10/8/15
####bind
React and Angular often bind for you by default so it is easy to forget that you need to. When you use react classes you have to explicitly `bind(this)` for each class method. React suggests doing it in the constructor. 

    class Butt extends React.Component{
        constructor(){
            super();
            this.handleTouchStartA = this.handleTouchStartA.bind(this);
            this.handleTouchEndA = this.handleTouchEndA.bind(this);
bind when you use jQuery

    <div>
        <input  id="inp"><br>
        <button type="button" >clickme</button>
    </div>
    <script>
        var user= {
            data: [
                {name:"T. Woods", age:37},
                {name:"P. Mickelson", age:43}
            ],      
            handleClick: function(){
                var randomNum = ((Math.random () * 2 | 0) + 1) - 1;
                $('#inp').val(this.data[randomNum].name)
            }
        }
        $('button').click(user.handleClick.bind(user))
    </script>

###currying 
<blockquote>
Function Currying, also known as partial function application, is the use of a function (that accept one or more arguments) that returns a new function with some of the arguments already set. The function that is returned has access to the stored arguments and variables of the outer function. This sounds way more complex than it actually is, so let’s code. <a href="http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/">from javascript is sexy</a>  
</blockquote>
Besides binding a context to a function, bind has other parameters. The context(what is `this`) is the first parameter. The other parameters are prepended to the bound function and serve as default parameters for it. Whatever you bind to a function can be used by another function as preset parameters. 

example of currying using bind:

    function greet (gender, age, name) {
        var salutation = gender === "male" ? "Mr. " : "Ms. ";
        if (age > 25) {
            return "Hello, " + salutation + name + ".";
        }
        else {
            return "Hey, " + name + ".";
        }
    } 
    var greetAnAdultMale = greet.bind (null, "male", 45);
    console.log(greetAnAdultMale ("John Hartlove")); // "Hello, Mr. John Hartlove."​
    var greetAYoungster = greet.bind (null, "", 16);
    console.log(greetAYoungster ("Alex")); // "Hey, Alex."​

Here is a currier function created with call and apply. It grabs the supplied 2nd argument of currier (in the function below currier has `sequence` as its first arg and `1` as its second) and uses that as the first (default) argument of `seq` concatenated with the argument supplied by `seq`

    function currier(fn){
        var args = Array.prototype.slice.call(arguments,1)
        return function(){
            return fn.apply(this, args.concat(
                Array.prototype.slice.call(arguments,0)))
        }
    } 

Now we can apply currying to any function by passing the function as the first argument to currier.

    var sequence= function(start, end){
        var result =[];
        for (var i = start; i<=end;i++){
            result.push(i)
        }
        return result
    }
    var seq = currier(sequence,1)
    console.log(seq(5))

<blockquote>
    We can implement curriedReadFile so that it starts the asynchronous read operation. And we are not forced to use the reader right away. We can keep it around, pass it to other functions and have our program do other things while the I/O operation progresses. When we need the result, we will call the reader with a callback. <a href="https://bjouhier.wordpress.com/2011/04/04/currying-the-callback-or-the-essence-of-futures/">Currying the callback</a>
</blockquote>