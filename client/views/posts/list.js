Template.postsList.helpers({
  posts: function() {

    //var imgSrcs = (post.content.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)||[]);

    return Posts.find({}, {sort: {submitted: -1}});
  }
});
Template.postStrip.stripImage = function(){

  var imgsrc = "";
  if(this.content){
    imgsrc = (this.content.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)||[]);
  }
  console.log(imgsrc);
  return imgsrc;
};