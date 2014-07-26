/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 7. 25.
 * Time: 오후 2:53
 * To change this template use File | Settings | File Templates.
 */
Template.calendar_modal.events({
  'click .closeBtn':function(event){
    event.preventDefault();
    this.callback({result:"cancel"}, this._id);
  }
});

Template.calendar_modal.rendered = function(){
  var monthOfPosts = Posts.find({submitted: {"$gte": new Date(moment().startOf('month').format()).getTime(),"$lt": new Date(moment().format()).getTime()}}).fetch();
  function postsToEvents(posts){
    return posts.map(function(post){return {title:post.title, start: moment(post.submitted).format("YYYY-MM-DD HH:mm:ss"), color:"black" }});
  };
  console.log(postsToEvents(monthOfPosts));
  $('.calendar').fullCalendar({
    /*header:{
     right : false
     },*/
    eventSources:postsToEvents(monthOfPosts)
  });
};
