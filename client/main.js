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
});