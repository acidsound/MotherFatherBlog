/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 2:51
 * To change this template use File | Settings | File Templates.
 */
Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
});
Meteor.publish('singlePost', function(id) {
  //히트 수 증가. 여기가 최선이 아닐까...
  Posts.update(id, {$inc: {hitCount: 1}});
  return id && Posts.find(id);
});
Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});
/*
 Meteor.publish('comments', function() {
 return Comments.find();
 });*/