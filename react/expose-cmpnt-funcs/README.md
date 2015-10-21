
#### tags: [bind, refs, react] <small><a href="/fiddles/index.html">[back to fiddles]</a></small>

simply expose a method on the child component for the parent to call.

Say a list of todos, which upon clicking get removed. If there's only one unfinished todo left, animate it:

#####code explanation:

Todo component 

    <Todo onClick={boundClick} key={i} title={item} ref={'item' + i} />

will be accessed by the parent Todos through the `ref` attribute

    handleClick: function(index) {
      ...
      this.setState({items: items}, function() {
        if (items.length === 1) {
          this.refs.item0.animate();
        }
      }.bind(this));
    } 

State is handled in Todos. handleClick modifies state, and, when at the last item, accesses the animate funtion of the this.refs.item0. BTW handle click works fine without `.bind(this)`

Todos render function has the Todo onClick event bound to the handleClick function of Todos. You would think this.handleClick(i) would be sufficient but it gives an error  

          render: function() {
            return (
              <div>
                {this.state.items.map(function(item, i) {
                  var boundClick = this.handleClick.bind(this, i);
                  return (
                    <Todo onClick={boundClick} key={i} title={item} ref={'item' + i} />
                  );
                }, this)}
              </div>
            );
          }

Simplifying: map goes through the array applying the callback function to each item using Todos' this within the callback

                items.map(callback(item, i), this)

                callback(item, i) {
                  var boundClick = this.handleClick.bind(this, i);
                  return (
                    <Todo onClick={boundClick} key={i} title={item} ref={'item' + i} />
                  );
                }

That still leaves the question on why it does not work if you use `this.handleClick(i)` instead of `this.handleClick.bind(this, i)`. It does, however, if you use `this.handleClick.bind(null, i)`. So it is a mystery since `handleClick` certainly references `this` inside itself.

all the code:


        var Todos = React.createClass({
          getInitialState: function() {
            return {items: ['Apple', 'Banana', 'Cranberry']};
          },
          handleClick: function(index) {
            var items = this.state.items.filter(function(item, i) {
              return index !== i;
            });
            this.setState({items: items}, function() {
              if (items.length === 1) {
                this.refs.item0.animate();
              }
            });
          },
          render: function() {
            return (
              <div>
                {this.state.items.map(function(item, i) {
                  var boundClick = this.handleClick.bind(this, i);
                  return (
                    <Todo onClick={boundClick} key={i} title={item} ref={'item' + i} />
                  );
                }, this)}
              </div>
            );
          }
        });

        var Todo = React.createClass({
          render: function() {
            return <div onClick={this.props.onClick}>{this.props.title}</div>;
          },
          animate: function() {
            console.log('Pretend %s is animating', this.props.title);
          }
        });