### exercise: ko editable table - Create a table with totals, addRow and deleteRow that is wired to ko observable and computed arrays and values.
#### tags: ["ko", "ko.observableArray", "ko.utils.arrayForEach", "ko.mapping.fromJS", "ko.computed", "ko.editable-table"]
- <a href="/fiddles/index.html">[back to fiddles]</a>


How do you create a table that can add and delete rows that have editable cells in a pivot table view of database records using Knockout.js?

    var data = {
        "Lines": [
            {"Entries": [{"Hours": 5.5},{"Hours": 2.50},{"Hours": 3.75}]}, 
            {"Entries": [{"Hours": 5.1},{"Hours": 2.00},{"Hours": 4.75}]},
            {"Entries": [{"Hours": 1.2},{"Hours": 3.00},{"Hours": 2.12}]}
        ]
    }
    var data1 = {"Entries": [{"Hours": 0},{"Hours": 0},{"Hours": 0}],Total:0};

You put the rows of editable cells within other cells by using this:

    <!-- ko foreach:Entries-->
    <td>
        <input size="3" type="text" data-bind="value:Hours, valueUpdate:'afterkeydown'"/>
    </td>
    <!-- /ko -->
    <td>
        <span data-bind="text:Total"></span> 
    </td>

 Everything is fed through the `mapping object` which takes the either `ko.mapping.fromJS(data.Lines, mapping, self.List)` or `ko.mapping.fromJS(data1, mapping)` and feeds it into the obervable and computed `model` creation function.

    var mapping = {
        create: function(options){
            return new model(options.data);
        }
    }

One had best `create` a generalized data `model` that you can instantiate by feeding in either `data.Lines` or `data1` as the `data` parameter in the `new model(options.data)` of the `mapping` object. That model takes its `data` parameter and in the last line `ko.mapping.fromJS(data, {}, self);` creates another mapping (yes a mapping is creating a mapping) from the js `data` through an empty object`{}` and applied to the `model`'s `self` context which is all the obervableness and computed values you have added in the model. Out comes a mapping in which the elements which are arrays are made observable the computed observables have been added.

    function model(data){
        self=this;
        self.Entries = ko.observableArray([]);
        self.Total = ko.computed(function(){
            var sum = 0
            ko.utils.arrayForEach(self.Entries(), function(entry){
                var value = parseFloat(entry.Hours(), 10);
                if(!isNaN(value)) {sum += value};
            })
            return sum;
        })
        ko.mapping.fromJS(data, {}, self);
    }    

When you first load data, you create an `obsevableArray()` and create a mapping from the js `data`.Lines through the `mapping` and into `model` creation, applying it all to `self.List`

    self.List = ko.observableArray([])
    self.LoadData = function (data) {                      
        ko.mapping.fromJS(data.Lines, mapping, self.List)
    }
    self.LoadData(data);

When you add a row you need to send the new js `data1` through the same mapping and observable computed model creation but this time instead of applying it to an observableArray, you just `push` it onto the existing one.

    self.addRow =function(){
        self.List.push(ko.mapping.fromJS(data1, mapping))
    }

Then you are done. If you want to see the data structure updating you can by

    <span data-bind="text: ko.toJSON(List, null, 2)"></span>

or for a clean js object

    <span data-bind="text: ko.mapping.toJSON(List)"></span>

This is how you add row to a table of observable and computed elements

Here is the fiddle: <a href="http://jsfiddle.net/mckennatim/frzsnx40/">http://jsfiddle.net/mckennatim/frzsnx40/ </a>  

refs:
<br><a href="http://10.0.1.100/fiddles/ko/disp-change/">ko-diplay udpating a model</a>
<br><a href="http://stackoverflow.com/questions/33228285/how-do-i-append-to-a-mapped-observable-array-in-knockout-js"> on How do I append to a mapped observable array in Knockout.js?</a>"by<a href="http://stackoverflow.com/users/3460734/super-cool">super-cool</a>
