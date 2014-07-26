/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 2.
 * Time: 오전 9:36
 * To change this template use File | Settings | File Templates.
 */
Cloudinary.config({
  cloud_name: 'www-underdogg-co-kr',
  api_key: '237359571816186',
  api_secret: 'GQmXkfyMXEK5x0b0g3gfgeb8EUU'
});


// Redirect to a random URL, better handled client-side
//underdogg.co.kr => www.underdogg.co.kr로 리다이렉팅
WebApp.connectHandlers.use(function(req, res, next) {
  console.log(req.headers.host);
  if(req.headers.host.indexOf('localhost') >= 0){
    next();
  }else{
    if(req.headers.host.indexOf('www.underdogg.co.kr') < 0){
      res.writeHead(307, {
        'Location': 'http://www.underdogg.co.kr' +req.url
      });
      res.end();
    }else {
      next();
    }
  }
});

