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
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};