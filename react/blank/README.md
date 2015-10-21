#### code explanation  <small><a href="/fiddles/index.html"> [back to fiddles]</a></small>

The html code:

    <div id="example"></div>
    <script type="text/jsx;harmony=true">
      var Dog = new React.createClass({
        dog: 'uli',
        render: function(){
          return (
            <div>
            hell {this.props.world} {this.dog}
            </div>
          )
        }
      })
      React.render(<Dog world='frog'/>, document.getElementById('example'))
    </script>