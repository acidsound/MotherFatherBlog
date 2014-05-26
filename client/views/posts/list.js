Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}});
  }
});
Template.postsList.rendered = function() {
  var container = document.querySelector('#postsList');
  var msnry = new Masonry( container, {
    // options...
    itemSelector: '.item'
  });

}
Template.postStrip.helpers({
  submittedMoment : function(){
    return moment(this.submitted).fromNow();
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
      stripTag.img = (this.content.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)||[]);
      stripTag.text = this.content.replace(/&nbsp;/g,'').replace(commentsAndPhpTags, '').replace(tags, function ($0, $1){return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';});

    }
    return stripTag;
  }
});

Template.postStrip.events({
  'click .jumbotron': function () {
    Router.go('postPage', {_id: this._id});
  }
});
Template.postStrip.rendered = function() {
  $('.content-preview').dotdotdot({
    watch:true,
    ellipsis : "...More"
  });
  $('.content-title').dotdotdot({
    watch:true
  });
}