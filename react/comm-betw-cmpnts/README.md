
#### tags: [bind, refs, react] <small><a href="/fiddles/index.html">[back to fiddles]</a></small>

For parent-child communication, simply pass props.

For child-parent communication: Say your GroceryList component has a list of items generated through an array. When a list item is clicked, you want to display its name:

#####code explanation:

      var GroceryList = React.createClass({
        handleClick: function(i) {
          console.log('You clicked: ' + this.props.items[i]);
        },
        render: function() {
          return (
            <div>
              {this.props.items.map(function(item, i) {
                return (
                  <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
                );
              }, this)}
            </div>
          );
        }
      });

      React.render(<GroceryList items={['Apple', 'Banana', 'Cranberry']} />, document.getElementById('example'))

To understand `map` and `this` consider that the map function above is equivalent to:

    items.map(callback(item,i),this)

      function callback(item,i){
          return (
            <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
          );  
      }    

where the callback operates on each item with the context of `this` coerced into refering to the GroceryList class (instead of some local this within the callback or map) .

But the question remains why `onClick={this.handleClick.bind(this, i)}` instead of `onClick={this.handleClick(i)}`? Maybe it is that the event handler is bound at the point at which the div is clicked? 

Another thought is that the `handleClick` function has a `this` in it so since we have buried the function somewhere else we have to tell it which `this` to use.
