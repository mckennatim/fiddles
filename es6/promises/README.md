### exercise: async via promises - compared to ajax callback
#### tags: ["promises", "ajax", "callback",  "onclick", "getElementById" ]
<a href="/fiddles/index.html">[back to fiddles]</a>

<a href="http://www.sitepoint.com/javascript-goes-asynchronous-awesome/?utm_medium=email&utm_campaign=SitePoint+Newsletter++22+October+2015&utm_content=SitePoint+Newsletter++22+October+2015+Version+A+CID_86674d87ee647f22ed59ff7afb4291db&utm_source=CampaignMonitor%20SitePoint&utm_term=Read%20more">promises</a>

<a href="#conclusion">live code below</a>
<blockquote>According to MDN, a promise is an object which is used for deferred and asynchronous computations. A promise represents an operation that hasn’t completed yet, but is expected in the future. Promises are a way of organizing asynchronous operations in such a way that they appear synchronous. </blockquote>

This exercise uses modules for a viewmodel `vm` and a service `Auth`. the viewmodel implements reading inputs, writing out a response and responding to two different click events. Here is portion of what the module pattern looks like:

    var vm= (function(){
      var dispResp = function(){respD.innerHTML=resp.message};
      dispResp();
      return{
        svals: '',
        setSvals: function(){
          this.svals= {url:this.getUrl(), name:this.getName(), email:this.getEmail()}
        },
      }
    })();

#### the callback approach
`cbClick()` sends url and parameters for the ajax call `this.svals` via `Auth.cbService` and includes a callback function. On `success` or `error` in ajax, a callback function is called. When it returns it returns to the viewmodel via an anonymous callback function that can then operate on `reso` and `response`

    cbClick: function(){
      this.setSvals()
      this.setResp('working')
      Auth.cbService(this.svals, function(respo,response){
        vm.setResp(respo);
      })
    }


    cbService: function(sv, callback){
      $.ajax({
        url: sv.url+'/api/ismatch/?name='+sv.name+'&email='+sv.email,
        success: function(data, status, response){
          var respo = "SUCCESS - data: "+JSON.stringify(data)+" status: "+JSON.stringify(status)+" response: "+JSON.stringify(response);  
          callback(respo, response);
        },
        error: function (response){
          var respo = "ERROR - status: "+JSON.stringify(status)+" response: "+JSON.stringify(response);  
          callback(respo, response);
        }
        .bind(this)
      })
    }

#### the promise approach
`prClick()` sends url and parameters for the ajax call `this.svals` via `Auth.promise` and instantiates a `new Promise` which wraps the ajax call. On `success` `resolve` returns `respo` and `response` through `.then()`. On `error` `reject` returns `respo` and `response` through `.catch()`. 

    prClick: function(){
      this.setSvals();
      this.setResp('promise working');
      Auth.promise(this.svals).then(function(respo,response){
        vm.setResp(respo)
      }).catch(function(respo,response){
        vm.setResp(respo)
      })
    }

    promise: function(sv){
      return new Promise(function (resolve, reject){
        $.ajax({
          url: sv.url+'/api/ismatch/?name='+sv.name+'&email='+sv.email,
          success: function(data, status, response){
            var respo = "SUCCESS - data: "+JSON.stringify(data)+" status: "+JSON.stringify(status)+" response: "+JSON.stringify(response);  
            resolve(respo, response);
          },
          error: function (response){
            var respo = "ERROR - status: "+JSON.stringify(status)+" response: "+JSON.stringify(response);  
            reject(respo, response);
          }
          .bind(this)
        })
      })
    }   

####conclusion
Perhaps I am too used to callbacks but to me promises look similar but cause me to have to have different functions for then and catch. Maybe if I chained promises I'd like them better.    