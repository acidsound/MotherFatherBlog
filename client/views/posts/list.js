Template.postsList.rendered = function() {
  //setTimeout(function(){isososo();},500);
  console.log("List rendered");
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
Template.postsList.events({
  'click .loadMore': function (e) {
    //setTimeout(function(){isososo();},500);
    e.preventDefault();
    //$(".item").removeClass("masonry_element");
      Router.go(this.nextPath);
  }
});
Template.postStrip.events({
  'click .jumbotron': function () {
    Router.go('postPage', {_id: this._id});
  }
});
Template.postStrip.rendered = function() {
  $(this.find('.content-preview')).dotdotdot({
    watch:true,
    ellipsis : "...More"
  });
  $(this.find('.content-title')).dotdotdot({
    watch:true
  });
  console.log("Item rendered");
 /* var notIso = $(this.find(".item:not(.isotope-item)"));
  console.log(notIso);
  if(!$(this.find(".item")).hasClass("isotope-item")){
    $('#postsList').isotope({
      // options
      itemSelector : '.item',
      masonry: {
        isFitWidth: true
      }
    }).append( notIso )
      .isotope( 'appended', notIso );

  }*/
 /* if(!$(this.find(".masonry_element")).hasClass("col-md-6")){
    $(this.find(".masonry_element")).addClass("col-md-6");
  }
*/

}