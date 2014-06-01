/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:41
 * To change this template use File | Settings | File Templates.
 */
Comments = new Meteor.Collection('comments');
Comments.allow({
  update: ownsDocument,
  remove: ownsDocument
});
Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    if (!commentAttributes.body||commentAttributes.body=="")
      throw new Meteor.Error(422, 'Please write some content');
    if (!post)
      throw new Meteor.Error(422, 'You must comment on a post');
    var comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: user._id,
      author: {name:user.profile.name,photo:user.profile.photo},
      submitted: new Date().getTime()
    });

    Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    comment._id = Comments.insert(comment);

    createCommentNotification(comment);

    somethingNotificationForAll("newComment", comment.postId, comment.userId);

    return comment._id;
  }
});

