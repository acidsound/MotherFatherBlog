/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 30.
 * Time: 오후 3:08
 * To change this template use File | Settings | File Templates.
 */
Template.category.helpers({
  popularList: function() {
    //-_- 뭐냐 category.postIds.length 로 sort해야 하는데
    //aggregate는 안되는거 같고
    var cateArray = Categories.find().fetch();
    if(!!cateArray){
      return cateArray.sort(function(a, b){return b.postIds.length - a.postIds.length}).slice(0,10);
    }else{
      return [];
    }

  },
  currentCategory : function(){
    if(Router.current() && Router.current().path){
      var urlParams = Router.current().path.split("/");
      if(urlParams[1]=="category"){
        return Categories.find({_id:urlParams[2]||""}).fetch()[0].body||"전체보기";
      }else{
        return "전체보기";
      }
    }else{
      return "전체보기";
    }
  }
});