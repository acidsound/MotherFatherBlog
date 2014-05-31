/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 1.
 * Time: 오전 2:05
 * To change this template use File | Settings | File Templates.
 */
Template.users.users = function() {
  return Meteor.users.find();
};
Template.users.userClass = function() {
  if(this.status && this.status.online){
    if(this.status.idle){
      return "badge-warning";
    }else{
      return "badge-success";
    }

  }
};