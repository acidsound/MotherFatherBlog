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
  return SEO.config({
    title: '공사중',
    meta: {
      'description': '공사중입니다. 하루 빨리 인터넷을 바꿔야 할낀데...'
    },
    og: {
      'image': 'http://underdogg.iptime.org:3000/images/gaethug.jpg'
    }
  });
});