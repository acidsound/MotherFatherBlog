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