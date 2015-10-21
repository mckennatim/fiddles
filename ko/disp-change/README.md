### exercise: ko dynamic array - create a table with editable cells that updates a total and computes a json representation as a computed observable 
#### tags: ["ko", "ko.observableArray", "ko.utils.arrayForEach", "ko.mapping.fromJS", "ko.computed", "ko.editable-table"]
<a href="/fiddles/index.html">[back to fiddles]</a>

How do you make an editable table that updates totals?

You put the rows of editable cells within other cells by using this:

    <!-- ko foreach:Entries-->
    <td>
        <input size="3" type="text" data-bind="value:Hours, valueUpdate:'afterkeydown'"/>
    </td>
    <!-- /ko -->
    <td>
        <span data-bind="text:Total"></span> 
    </td>

How do you update the view to a change that happens in the viewmodel code?

The app below displays a list of entries and updates the totals. To update the jsonList by click you define it as an observable and then pass in the new version 

    self.jsonList=ko.observable("mu dog is uli")
    self.show = function(){//the button click function
        self.jsonList(ko.toJSON(self.List()));
    };  

To have a computed jsonList2 that updates on any view change you can use

    self.jsonList2=ko.computed(function(){
        var newval = ko.toJSON(self.List())
        return newval;
    });

Here is the fiddle: <a href="http://jsfiddle.net/mckennatim/behp23u7/">http://jsfiddle.net/mckennatim/behp23u7/ </a>  
