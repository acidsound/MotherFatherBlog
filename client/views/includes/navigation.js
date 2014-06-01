/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 30.
 * Time: 오후 3:08
 * To change this template use File | Settings | File Templates.
 */
Template.navigation.helpers({
  popularList: function() {
    //-_- 뭐냐 category.postIds.length 로 sort해야 하는데
    //aggregate는 안되는거 같고
    var cateArray = Categories.find().fetch();
    if(!!cateArray && cateArray.length > 0){
      return cateArray.sort(function(a, b){return b.postIds.length - a.postIds.length}).slice(0,10);
    }else{
      return [];
    }

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

/*Template.category.rendered = function(){
  $('#popularList').selectpicker();
};*/
/*
var renderTimeout = false;
Template.category.rendered = function(){
  $('#popularSelect').select2();
};*/
