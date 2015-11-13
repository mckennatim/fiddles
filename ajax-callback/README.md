### exercise: async via callback - On using a service to handle ajax and respond with a callback
#### tags: ["ajax", "callback",  "onclick", "getElementById" ]
<a href="/fiddles/index.html">[back to fiddles]</a>
<a href="http://www.sitepoint.com/javascript-goes-asynchronous-awesome/?utm_medium=email&utm_campaign=SitePoint+Newsletter++22+October+2015&utm_content=SitePoint+Newsletter++22+October+2015+Version+A+CID_86674d87ee647f22ed59ff7afb4291db&utm_source=CampaignMonitor%20SitePoint&utm_term=Read%20more">promises</a>

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