/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 29.
 * Time: 오전 10:00
 * To change this template use File | Settings | File Templates.
 */
Template.popularPosts.helpers({
  popularList: function() {
    return Posts.find({},{sort: {hitCount: -1}, limit: 10});
  }
});