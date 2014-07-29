/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 30.
 * Time: 오후 2:32
 * To change this template use File | Settings | File Templates.
 */
var currentCategory;
Template.header.helpers({
  categoryList: function() {
    //-_- 뭐냐 category.postIds.length 로 sort해야 하는데
    //aggregate는 안되는거 같고
    /*var cateArray = Categories.find().fetch();
    if(!!cateArray && cateArray.length > 0){
      return cateArray.sort(function(a, b){return b.postIds.length - a.postIds.length}).slice(0,10);
    }else{
      return [];
    }*/
    return Categories.find().fetch();
  },
  currentCategory : function(){
    var defaultName = "Category";
    if(Router.current() && Router.current().path){
      var urlParams = Router.current().path.split("/");
      if(urlParams[1]=="category" && urlParams[2]){
        var category = Categories.findOne(urlParams[2]);
        if(category && category.body){
          return category.body||defaultName;
        }else{
          return defaultName;
        }

      }else{
        return defaultName;
      }
    }else{
      return defaultName;
    }
  }
});
Template.header.events({
  'keypress .search-query': function (evt, template) {
    if (evt.which === 13) {
      Router.go('searchPosts', {searchText: $(".search-query").val()});
    }
  }
});
Template.categoryRow.helpers({
  activeClass : function(){
    var urlParams = Router.current().path.split("/");
    return (urlParams[2]||"") == this._id ?"active" : "";
  }
});

Template.header.rendered = function(){
  var left_flag = true;
  function getRandTime(){
    return (Math.floor(Math.random() * 5) + 1)*1000;
  }
  var flipflop = function(){
    left_flag = !left_flag;
    if(left_flag){
      $('.left-man').transition({  scale: [1.7, 1.7] ,  delay: 500 }, 'linear').transition({  scale: [1.0, 1.0] ,  delay: 500 });
    }else{
      $('.right-man').transition({  scale: [1.7, 1.7] ,  delay: 500 }).transition({  scale: [1.0, 1.0] ,  delay: 500 });
    }
    //$(className).transition({  scale: [1.5, 1.2] ,  delay: 500 }).transition({  scale: [1.0, 1.0] ,  delay: 500 });
    setTimeout(flipflop, getRandTime());
  };

  setTimeout(flipflop, getRandTime());
};