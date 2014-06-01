/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:45
 * To change this template use File | Settings | File Templates.
 */
Template.comment.helpers({
  submittedMoment: function() {
    return moment(this.submitted).fromNow();
  },
  ownComment: function() {
    return this.userId == Meteor.userId();
  }
});

Template.comment.events({
  'click .removeBtn':function(event){
    event.preventDefault();

    var currentComment = this;
    var postId = currentComment.postId;
    Comments.remove({_id:currentComment._id});
    Posts.update({_id: postId}, {$inc: {commentsCount: -1}});

  }
});