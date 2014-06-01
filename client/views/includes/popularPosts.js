/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 29.
 * Time: 오전 10:00
 * To change this template use File | Settings | File Templates.
 */
Template.popularPosts.helpers({
  popularList: function() {
    var list = Posts.find({},{sort: {hitCount: -1}, limit: 5}).fetch();
    _.forEach(list, function(item, index){
      item.index = index +1;
    });

    return list;
  }
});