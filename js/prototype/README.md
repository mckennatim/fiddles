### exercise: prototype, 
#### tags: ["prototype", "borrowing methods", "apply"]
<a href="/fiddles/index.html">[back to fiddles]</a>

<a href="http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/">from javascript is sexy</a>

10/8/15
<blockquote>
When we call Array.prototype, we are reaching into the Array object and on its prototype (where all its methods are defined for inheritance). And it is from there—the source—that we are borrowing the Array methods. Hence the use of code like Array.prototype.slice—the slice method that is defined on the Array prototype.
</blockquote>
<blockquote>Every JavaScript function has a prototype property (this property is empty by default), and you attach properties and methods on this prototype property when you want to implement inheritance... You add methods and properties on a function’s prototype property to make those methods and properties available to instances of that function.</blockquote>

example:

We add the print () method to PrintStuff prototype property so that other instances (objects) can inherit it:​

    function PrintStuff (myDocuments) {
    ​   this.documents = myDocuments;
    }
    PrintStuff.prototype.print = function () {
        console.log(this.documents);
    }

Create a new object with the PrintStuff () constructor, thus allowing this new object to inherit PrintStuff's properties and methods.​

    ​var newObj = new PrintStuff ("I am a new Object and I can print.");

newObj inherited all the properties and methods, including the print method, from the PrintStuff function. Now newObj can call print directly, even though we never created a print () method on it.​

    newObj.print (); //I am a new Object and I can print.

