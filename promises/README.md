### exercise: ajax callback, 
#### tags: ["promises", "ajax", "callback", "es6", "then", "onclick", "getElementById" ]
<a href="/fiddles/index.html">[back to fiddles]</a>

    <div>
    Hello world
    <button onclick="clickFunc()" id="but" type="text">button</button>
    </div>

    <script>
    var b = document.getElementById('but')

    function clickFunc()
      {console.log('clicked it')
      clickService(myCallback)
    }

    function clickService(callback){
      var username='tim';
      var email='mckenna.tim@gmail.com';
      $.ajax({
        url: 'http://sitebuilt.net:3002/api/ismatch/?name='+username+'&email='+email,
        success: function(data){
          callback(data);
        }
        .bind(this)
      })
    }

    function myCallback(data){
      console.log(data)
    }
    </script>