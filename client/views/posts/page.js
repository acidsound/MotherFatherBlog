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
    return moment(this.submitted).format('LLLL');
  },
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-default upvotable';
    } else {
      return 'disabled';
    }
  }
});
Template.postItem.events({
  'click .goList': function(e) {
    e.preventDefault();
    Router.go('home');
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
  },
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
Template.postItem.rendered = function(){
  if (!this.rendered){
    var youtubeElems = $('.content-wrapper').find("img[alt='youtube']");
    _.forEach(youtubeElems, function(elem){
      var youtubeId =  $(elem).attr("name");
      //width=\"400\" height=\"225\"
      //
      var contentWidth = $('#postItem .content-wrapper').width();
      var heigth = 9*contentWidth/16;
      $(elem).replaceWith("<iframe width='"+contentWidth+"' heigth='"+heigth+"' src=\"http://www.youtube.com/embed/"+youtubeId+ "\" frameborder=0></iframe>");

    });

    //수동 메타태그 설정
    var img = $("<div></div>").html(this.data.content).find('img').attr("src")||"";
    var text = $($("<div></div>").html(this.data.content)).text()||"";
    $('html').find('meta[name=description]').attr('content', text.slice(0,60));
    $('html').find('meta[name=title]').attr('content', this.data.title);
    $('html').find('meta[name=url]').attr('content', "http://www.underdogg.co.kr"+Router.current().path);
    $('html').find('meta[name=image]').attr('content',img);
  }
};
