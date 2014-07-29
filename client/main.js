/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 2:35
 * To change this template use File | Settings | File Templates.
 */

Meteor.startup(function() {
  Meteor.loginWithFacebook({
    requestPermissions: ['publish_actions']
  }, function (err) {
    if (err) {
      Session.set('errorMessage', err.reason || 'Unknown error');
    }
  });



  moment.lang('ko');

  Deps.autorun(function() {
    try {
      UserStatus.startMonitor({
        threshold: 30000,
        idleOnBlur: true
      });
      return this.stop();
    } catch (_error) {}
  });

  var agt = navigator.userAgent.toLowerCase();

  //ms-seo 이 라이브러리를 보면... ignore를 따로 옵션 줄만한 거시기가 없다. 이곳 opt에서 거시기 해불자.
  var opt = {
    title: 'UnderDoggg',
    rel_author: 'https://www.google.com/+호성이',
    ignore :{
      link:['icon', 'shortcut icon', 'stylesheet'],
      meta : ['fragment','viewport', 'mobile-web-app-capable', 'apple-mobile-web-app-capable', 'apple-mobile-web-app-status-bar-style']
    },
    meta: {
      'description': 'Linux linaro-server 3.0.36+ #2 SMP PREEMPT Mon Jan 27 15:07:00 ICT 2014 armv7l armv7l armv7l GNU/Linux - 방구석 자비스'
    },
    og: {
      'image': 'http://www.underdogg.co.kr/images/logo.png'
    }
  };
  if(agt.indexOf("msie") != -1){
  }

  SEO.config(opt);


});