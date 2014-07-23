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
sendNotification = function(options){
  Notifications.insert(options);
};
createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    var opt = {
      class : "warning",
      userId: post.userId,
      postId: post._id,
      creator: comment.author,
      submitted: new Date().getTime(),
      message:"commented on your post",
      read: false
    }
    sendNotification(opt);
  }

};
somethingNotificationForAll = function(type, postId, creatorId){
  var loggedInUsers = Meteor.users.find().fetch().filter(function(user){return user.status && user.status.online});
  var creator = Meteor.users.findOne(creatorId);
  var msg = "";
  if(type ==="newPost"){
    msg = "님의 새로운 포스팅.";
  }else if(type ==="newComment"){
    msg = "님의 새로운 댓글.";
  }else if(type ==="newThumb"){
    msg = "님의 엄지.";
  }
  var opt = {
    class : "success",
    postId: postId,
    userId: creatorId,
    creator: {name:creator.profile.name, photo:creator.profile.photo},
    submitted: new Date().getTime(),
    message:msg,
    read: false
  };
  _.forEach(loggedInUsers, function(user){
    if(creator._id != user._id){
      opt.userId =  user._id;
      sendNotification(opt);
    }
  });

};