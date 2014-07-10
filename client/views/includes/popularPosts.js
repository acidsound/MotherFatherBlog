/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 29.
 * Time: 오전 10:00
 * To change this template use File | Settings | File Templates.
 */
Template.popularPosts.helpers({
  popularList: function() {
    var textClasssss = ["text-danger", "text-danger", "text-danger", "text-muted" ,"text-muted", "text-muted", "text-muted", "text-muted", "text-muted", "text-muted"];
    var list = Posts.find({},{sort: {hitCount: -1}, limit: 10}).fetch();
    _.forEach(list, function(item, index){
      item.index = index +1;
      item.textClass = textClasssss[index];
    });

    return list;
  }
});