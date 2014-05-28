/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:44
 * To change this template use File | Settings | File Templates.
 */
Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});

Template.postItem.helpers({
  submittedMoment : function(){
    console.log(this.hitCount);
    return moment(this.submitted).format('LLLL');
  },
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});
Template.postItem.events({
  'click .goList': function(e) {
    e.preventDefault();
    Router.go('postsList');
  },
  'click .goComment': function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $(".comment-area").offset().top-70
    }, 500);
  },
  'click .goEdit': function(e) {
    e.preventDefault();
    Router.go('postEdit', {_id: this._id});
  }
});
