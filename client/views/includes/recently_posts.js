/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 29.
 * Time: 오전 10:00
 * To change this template use File | Settings | File Templates.
 */
Template.recently_posts.helpers({
  recentlyList: function() {
    return Posts.find({},{sort: {submitted: -1, _id: -1}, limit: 3}).fetch();
  }
});

Template.recently_post.helpers({
  timeAgo: function(){
    return moment(this.submitted).fromNow()
  }
});