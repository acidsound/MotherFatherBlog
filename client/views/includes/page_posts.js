/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 29.
 * Time: 오전 10:00
 * To change this template use File | Settings | File Templates.
 */
Template.page_posts.created = function(){
  Session.set('perPage', 5);
  Session.set('pageNumber',0 );
}
Template.page_posts.helpers({
  pageList: function() {
    //submittedMoment
    var list = Posts.find({},{sort: {submitted: -1}, limit:  Session.get('perPage'), skip: Session.get('perPage')* Session.get('pageNumber')}).fetch();
    _.forEach(list, function(item){
      item.submittedMoment = moment(this.submitted).format('YYYY년 MM월 DD일')
    });
    return list;
  },
  totalCount : function(){
    return Posts.find().count();
  },
  countList : function(){
    var countList = [];
    for(var i = 0, l = Posts.find().count() / Session.get('perPage'); i < l ; i++){
      var item = {};
      if(Session.get('pageNumber') == i){
        item.activeClass = "active";
      }else {
        item.activeClass = "";
      }
      item.index = i;
      item.dispIndex = i+1;
      countList.push(item);
    }
    return countList;
  }
});
Template.page_posts.events({
  'click .previous': function (evt, tmpl) {
    evt.preventDefault();
    console.log(tmpl);
    var count = Session.get('pageNumber') - 1;
    if(count > 0){
      Session.set('pageNumber', count);
      //$(tmpl.firstNode).find('.previous').addClass("active");
    }
  },
  'click .next': function (evt, tmpl) {
    evt.preventDefault();
    var count = Session.get('pageNumber') + 1;
    Session.set('pageNumber', count);
  },
  'click .page-item': function (evt, tmpl) {
    evt.preventDefault();
    Session.set('pageNumber', $(evt.currentTarget).attr("data-page-number"));
  }
});