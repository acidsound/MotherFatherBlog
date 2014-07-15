/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 29.
 * Time: 오전 10:00
 * To change this template use File | Settings | File Templates.
 */
Template.popularPosts.helpers({
  popularList: function() {
    var hitsClass = ["badge-danger", "badge-warning", "badge-success", "badge-info" ,"badge-primary", "badge-muted", "badge-muted", "badge-muted", "badge-muted", "badge-muted"];
    var list = Posts.find({},{sort: {hitCount: -1}, limit: 10}).fetch();
    _.forEach(list, function(item, index){
      item.index = index +1;
      item.hitsClass = hitsClass[index];
      //item.showingHit = index < 5 ? true:false;
    });
    return list;
  }
});

/*Template.popularPosts.events({
  'click .post-item': function (e) {
    e.preventDefault();
    Router.go('postPage', {_id: this._id})
  }
});*/

