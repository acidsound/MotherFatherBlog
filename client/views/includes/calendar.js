/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 7. 25.
 * Time: 오후 2:53
 * To change this template use File | Settings | File Templates.
 */

Template.calendar.helpers({
  monthOfPosts: function() {
    return Posts.find({submitted: {"$gte": new Date(moment().startOf('month').format()).getTime(),"$lt": new Date(moment().format()).getTime()}}).fetch();
  }
});

Template.calendar.rendered = function(){
  //날짜시간은 참 개 좃같아...
  //이번 달 초 부터 현재까지의 포스팅
  //var monthOfPosts = Posts.find({submitted: {"$gte":moment().startOf('month').unix(),"$lt": moment().unix()}}).fetch();
  //시바 논블라킹으로 그냥 훑고 지나가는데?
  //var monthOfPosts = Posts.find({submitted: {"$gte": new Date(moment().startOf('month').format()).getTime(),"$lt": new Date(moment().format()).getTime()}}).fetch();
  console.log(Template.calendar.monthOfPosts());
  function postsToEvents(posts){
    return posts.map(function(post){return {description:post.title, start: moment(post.submitted).format("YYYY-MM-DD HH:mm:ss")}});
  };
  var events = postsToEvents(monthOfPosts);
  console.log(events);
  $('.calendar').fullCalendar({
    /*header:{
      right : false
    },*/
    events:events
  });
};