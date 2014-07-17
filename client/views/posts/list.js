Template.postsList.helpers({
  postList: function() {
    this.posts.rewind();
    return this.posts;

  }
});
Template.postsList.events({
  'click .loadMore': function (e) {
    e.preventDefault();
    Router.go(this.nextPath);
  }
});
Template.postStrip.helpers({
  submittedMoment : function(){
    return moment(this.submitted).format('LLLL');
  },
  stripTag : function(){
    var stripTag = {
      img:"",
      text:""
    };
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      allowed = ((("" || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''),
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    if(this.content){
      //stripTag.img = (this.content.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)||[]);
      //stripTag.text = this.content.replace(/&nbsp;/g,'').replace(commentsAndPhpTags, '').replace(tags, function ($0, $1){return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';});
      stripTag.img = $("<div></div>").html(this.content).find('img').attr("src")||"";
      stripTag.text = $($("<div></div>").html(this.content)).text();
    }
    return stripTag;
  }
});

Template.postStrip.rendered = function() {

  $('html').find('meta[name=description]').attr('content', "arm 보드 위에 meteorJS로 만들어진 나의 수제 블로그...");
  $('html').find('meta[name=title]').attr('content', "UnderDoggg");
  $('html').find('meta[name=url]').attr('content', "http://www.underdogg.co.kr");
  $('html').find('meta[name=image]').attr('content',"http://www.underdogg.co.kr/images/icon.png");
  $('html').find('meta[name=author]').attr('content',"");
  $('html').find('meta[name=keywords]').attr('content',"");

  $('title').text("UnderDogggg");

  $(this.find('.content-title')).dotdotdot({
    watch:true
  });
  $(this.find('.content-preview')).dotdotdot({
    watch:true
  });


}