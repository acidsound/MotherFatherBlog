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
Deps.autorun(function() {
  try {
    UserStatus.startMonitor({
      threshold: 30000,
      idleOnBlur: true
    });
    return this.stop();
  } catch (_error) {}
});