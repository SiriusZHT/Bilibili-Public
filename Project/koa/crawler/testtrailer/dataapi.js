<script>
    function jsonp(url, arg , fn){
      // 1.动态创建script标签，设置src属性
      var srpt  = document.createElement('script')
      // srpt.src = ''  
      // url?callback=方法名&page=1&cout=10

      // 1.1 拼接url中的参数
      var queryString = ''  // 这个变量保存参数的字符串形式
      for(var key in arg){
          queryString += key + '=' + arg[key] + '&'
      }

      // 不能写死，我们就动态创建方法名
      // 随机生成字符
      var funName = 'fun_'+ Math.random().toString().substr(3) // fun_0.121212

      window[funName] = fn

      url += '?' + queryString

      // 1.2 设置callback参数，并创建方法

      url += 'callback=' + funName

      srpt.src = url
      // 2.把得到的script标签添加到dom上去
      document.body.appendChild(srpt)
    }

    // 使用,url:'',arg:{}, callback
    jsonp('https://api.douban.com/v2/movie/coming_soon',{start:0,count:10},
      function(data){
        console.log(data)
      })

    // 使用,url:'',arg:{}, callback
    jsonp('https://api.douban.com/v2/movie/coming_soon',{start:0,count:20},
      function(data){
        console.log(data)
      })

  </script>
