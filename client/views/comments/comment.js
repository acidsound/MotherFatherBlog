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

Template.comment.rendered = function(){
  if (!this.rendered){
    /*var youtubeElems = $(this.firstNode).find("img[alt='youtube']");
    _.forEach(youtubeElems, function(elem){
      var youtubeId =  $(elem).attr("name");
      $(elem).replaceWith("<div class='embed-responsive embed-responsive-16by9'><iframe  class='embed-responsive-item' src=\"http://www.youtube.com/embed/"+youtubeId+ "\" frameborder=0></iframe></div>");
    });*/
  }
};