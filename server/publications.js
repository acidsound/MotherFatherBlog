/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 2:51
 * To change this template use File | Settings | File Templates.
 */
Meteor.publish('posts', function() {
  return Posts.find();
});
Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});
/*
 Meteor.publish('comments', function() {
 return Comments.find();
 });*/
