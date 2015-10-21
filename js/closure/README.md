### exercises: closure
#### tags: ["closure", "document.querySelectorAll", "promises", "IIFE", "module","pattern"]
- <a href="../../">[back to fiddles]</a>


<blockquote>
    Accessing variables outside of the immediate lexical scope creates a closure. In other words, a closure is formed when a nested function is defined inside of another function, allowing access to the outer functions variables. Returning the nested function allows you to maintain access to the local variables, arguments, and inner function declarations of its outer function. <a href="http://ryanmorr.com/understanding-scope-and-context-in-javascript/">http://ryanmorr.com/understanding-scope-and-context-in-javascript/</a>
</blockquote>

One of the most popular types of closures is what is widely known as the module pattern; it allows you to emulate public, private, and privileged members:

    var Module = (function(){
        var privateProperty = 'foo';
        function privateMethod(args){
            // do something
        }
        return {
            publicProperty: '',
            publicMethod: function(args){
                // do something
            },
            privilegedMethod: function(args){
                return privateMethod(args);
            }
        };
    })();


