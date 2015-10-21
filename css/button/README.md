### exercise: mobile first responsive css, 
#### tags: [float, @media, min_width, css3]
<a href="/fiddles/index.html">[back to fiddles]</a>

The html code:

    <div class="container">
      <div class="section">Section</div>
      <div class="aside">Aside</div>
    </div>

The css code:

    @media all and (min-width: 420px) {
      .container {
        max-width: 538px;
      }
      .section {
        float: left;
        width: 63.197026%;
      }
      .aside {
        float: right;
        width: 29.3680297%;
      }
    }    