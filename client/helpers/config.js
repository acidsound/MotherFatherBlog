/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 3:41
 * To change this template use File | Settings | File Templates.
 */
/*
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});*/




// 얜 어따 두냐 -_ - 나원 참
Meteor.startup(function() {
  if(Meteor.isClient){
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
        'description': '요리사가 자기 저녁밥 만들어 먹고 목수가 자기 집 신발장 짜고 치과 의사가 자기 이빨 신경 치료 하듯 나도 내 웹 사이트는 직접...'
      },
      og: {
        'image': 'http://www.underdogg.co.kr/images/logo.png'
      }
    };
    if(agt.indexOf("msie") != -1){
    }
    SEO.config(opt);
  }
});