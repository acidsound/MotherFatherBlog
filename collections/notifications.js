/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 23.
 * Time: 오전 9:48
 * To change this template use File | Settings | File Templates.
 */
Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});
createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      causeId: comment._id,
      causer: comment.author,
      message:"commented on your post",
      read: false
    });
  }
};
createSomethingNotificationForAll = function(type, post){
  var loggedInUsers = Meteor.users.find().fetch();
  var msg = type ==="newPost"?"님의 새로운 포스팅":"님의 새로운 댓글";
  _.forEach(loggedInUsers, function(user){
    Notifications.insert({
      userId: user._id,
      postId: post._id,
      causeId: post._id,
      causer: post.author,
      message:msg,
      read: false
    });
  });

};