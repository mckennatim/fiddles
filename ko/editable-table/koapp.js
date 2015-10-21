// MOTIVATION
/*
This assignment aims to simulate the use case where there is data in a database that we want to view, modify, and then update through a UI. I am not as interested in how it looks, more that it functions correctly (though if you do have time, feel free to apply some css). The variable serverData serves as the simulated data that is returned from a web service call. Each piece of data represents a particular Year/Month combination and gives the value associated with it.
*/

// Assume that the following data came back from a web service call...
var serverData = [
    {Year: 2012, Month: 1, Value: .5},
    {Year: 2012, Month: 2, Value: .5},
    {Year: 2012, Month: 3, Value: .75},
    {Year: 2012, Month: 4, Value: .75},
    {Year: 2012, Month: 5, Value: .5},
    {Year: 2012, Month: 6, Value: .5},
    {Year: 2012, Month: 7, Value: .75},
    {Year: 2012, Month: 8, Value: .75},
    {Year: 2012, Month: 9, Value: .5},
    {Year: 2012, Month: 10, Value: .5},
    {Year: 2012, Month: 11, Value: .75},
    {Year: 2012, Month: 12, Value: .75},
    
    {Year: 2013, Month: 1, Value: .5},
    {Year: 2013, Month: 2, Value: .5},
    {Year: 2013, Month: 3, Value: .75},
    {Year: 2013, Month: 4, Value: .75},
    {Year: 2013, Month: 5, Value: .5},
    {Year: 2013, Month: 6, Value: .5},
    {Year: 2013, Month: 7, Value: .75},
    {Year: 2013, Month: 8, Value: .75},
    {Year: 2013, Month: 9, Value: .5},
    {Year: 2013, Month: 10, Value: .5},
    {Year: 2013, Month: 11, Value: .75},
    {Year: 2013, Month: 12, Value: .75},

    {Year: 2014, Month: 1, Value: .85}
];

// TODO: Create a viewmodel for the UI
/* 
1. What the UI should show 
Create a display that shows a grid, where each row in the grid collects all of the data for a given year and displays the values for each month in that year. Each month should show the value returned from the server, and all values (Year and Values) should be able to be edited. Don't worry about validation.
Fill headings that didn't come back with 0 values.
Create a computed observable for each row to display the Total value for all months in that row. The Total should update in response to any value changes in the row.
Example:
YEAR | JAN | FEB | MAR |...| DEC | Total
2012 | 0   |  .5 | 0   |...| .75 | X
2013 | 0   |  .5 | 0   |...| .75 | Y
...
*/

// TODO: Create some functionality
/*
2. What the UI should do
NOTE: jquery and bootstrap are both available in this fiddle, if you want to use them.
Create a way where users can add a row, and update any of the Year or Month values. Default values for all months should be .08.
Default Year can be hard coded to this year.
Create a way for users to delete existing rows.

Create a way for the current data shown in the UI to be saved to the database. It must provide data in the same format as serverData. This could be a save button with a click handler that returns an array of objects similar to serverData, but representing the current data in the UI.
*/


function parseD(){
    var na =[{Year:0, Values:JSON.parse(monthsBlank)}]
    serverData.forEach(function(x){
        var idx = na.length-1
        if (na[idx].Year == x.Year){
            na[idx].Values[x.Month-1].m=x.Value;
        }else{
            var a = JSON.parse(monthsBlank)
            a[x.Month-1].m=x.Value;
            var newyr = {Year:x.Year, Values: a}
            na.push(newyr)
        }
    }) 
    var years=(na.slice(1)); 
    return years      
} 

//console.log(JSON.stringify(parseD()))
//[{"Year":2012,"Values":[{"m":0.5},{"m":0.5},{"m":0.75},{"m":0.75},{"m":0.5},{"m":0.5},{"m":0.75},{"m":0.75},{"m":0.5},{"m":0.5},{"m":0.75},{"m":0.75}]},{"Year":2013,"Values":[{"m":0.5},{"m":0.5},{"m":0.75},{"m":0.75},{"m":0.5},{"m":0.5},{"m":0.75},{"m":0.75},{"m":0.5},{"m":0.5},{"m":0.75},{"m":0.75}]},{"Year":2014,"Values":[{"m":0.85},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0}]}]
var headings =['JAN', 'FEB', 'MAR', 'APR','MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
var monthsBlank =JSON.stringify([{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0},{"m":0}])
var monthsDef =JSON.stringify([{"m":.08},{"m":.08},{"m":.08},{"m":.08},{"m":.08},{"m":.08},{"m":.08},{"m":.08},{"m":.08},{"m":.08},{"m":.08},{"m":.08}])
var yearBlank={Year:2015, Values:JSON.parse(monthsDef)}

function model(data){
    var self=this;
    self.Year = ko.observable();
    self.Values = ko.observableArray();
    self.Total = ko.computed(function(){
        var sum=0;
        ko.utils.arrayForEach(self.Values(), function(entry){
            var value = parseFloat(entry.m(),10);
            if(!isNaN(value)){sum+=value}; 
        })
        return sum;
    })    
    ko.mapping.fromJS(data, {}, self)
}
var mapping = {
    create: function(options){
        return new model(options.data);
    }
}

function vm3(){
    var self =this;
    self.returnedEditedData = ko.observable();
    self.Years = ko.observableArray([]);
    self.LoadData = function(d){
        ko.mapping.fromJS(d, mapping, self.Years);
    }
    self.LoadData(parseD());
    self.headings =headings;
    self.astr = ko.computed(function(){
        return ko.mapping.toJSON(self.Years())
    })
    self.addYear =function(){
        self.Years.push(ko.mapping.fromJS(yearBlank, mapping))
        // console.log(ko.toJSON(self.Years))
        // console.log(ko.mapping.toJSON(self.Years))
        // console.log(ko.toJSON(ko.mapping.fromJS(yearBlank, mapping)))
    };
    self.delete = function(){
        // console.log(ko.mapping.toJSON(this))
        // console.log(self.Years.indexOf(this))
        self.Years.splice(self.Years.indexOf(this),1)
    };
    self.send2server = function(){
        var editedData=[]
        var arr = ko.mapping.toJS(self.Years())
        // console.log(JSON.stringify(arr))
        arr.map(function(obj){
            // console.log(obj.Year)
            obj.Values.map(function(mobj,idx){
                if(mobj.m!=0){
                    var newobj = {Year:obj.Year, Month:idx+1, Value:mobj.m}
                    editedData.push(newobj)
                }
            })
        })
        self.returnedEditedData(JSON.stringify(editedData))

    }

}
ko.applyBindings(new vm3(), document.getElementById("ko"));


