The html code:

    <div class="container">
      <div class="section">Section</div>
      <div class="aside">
          <div class="sb-but">
            <span>dog</span> 
          </div>
      </div>
      <br/>
    </div>

The 

    <br> 

with its clear:both; is there to strech the container below section and aside and prevent anything else from wandering up. 
The css code:
    
    br{
      clear:both;
    }    
    @media all and (min-width: 420px) {
      .container {
        max-width: 538px;
      }
      .section {
        float: left;
        width: 50%;
      }
      .aside {
        float: right;
        width: 25%;
      }
    }    

shows that and a mobile-first media query where what happens in a wider browser is the exception to the 'normal' moobile code.    