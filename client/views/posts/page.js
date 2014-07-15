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
  },
  //이런 개시발 스러운 렌더링 문제
  //posts/_id1 에서 posts/_id2로 이동 시 render callback이 호출되지 않는다. 한참을 고민하다가 결국 미친짓을 하게 되었는데.
  //원하는 대로 동작은 하지만... 아...쫌....
  dynamicConent : function(){
    //console.log( (this.content.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)||[]));
    var elements = $('<div>').html(this.content);
    _.forEach(elements.find("img[alt='youtube']"), function(elem){
      var youtubeId =  $(elem).attr("name");
      $(elem).replaceWith("<div class='embed-responsive embed-responsive-16by9'><iframe  class='embed-responsive-item' src=\"http://www.youtube.com/embed/"+youtubeId+ "\" frameborder=0></iframe></div>");
    });

    //수동 메타태그 설정
    var img = $("<div></div>").html(this.content).find('img').attr("src")||"";
    var text = $($("<div></div>").html(this.content)).text()||"";
    $('html').find('meta[name=description]').attr('content', text.slice(0,60));
    $('html').find('meta[name=title]').attr('content', this.title);
    $('html').find('meta[name=url]').attr('content', "http://www.underdogg.co.kr"+Router.current().path);
    $('html').find('meta[name=image]').attr('content',img);

    return elements.html();
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
  /*var elems = $('.content-wrapper').find("img");

  _.forEach(elems, function(elem){
    elem.boxer({mobile:true});
  });*/
  /*if(!this._rendered) {
    this._rendered = false;
    console.log('Template onLoad');

    var youtubeElems = $('.content-wrapper').find("img[alt='youtube']");
    _.forEach(youtubeElems, function(elem){
      var youtubeId =  $(elem).attr("name");
      //width=\"400\" height=\"225\"
      //
      //var contentWidth = $('#postItem .content-wrapper').width();
      //var heigth = parseInt(9*contentWidth/16);

      $(elem).replaceWith("<div class='embed-responsive embed-responsive-16by9'><iframe  class='embed-responsive-item' src=\"http://www.youtube.com/embed/"+youtubeId+ "\" frameborder=0></iframe></div>");

    });

  }*/
};
