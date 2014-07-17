/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 29.
 * Time: 오전 10:00
 * To change this template use File | Settings | File Templates.
 */
Template.categories.helpers({
  categoryList: function() {
    //-_- 뭐냐 category.postIds.length 로 sort해야 하는데
    //aggregate는 안되는거 같고
    var cateArray = Categories.find().fetch();
     if(!!cateArray && cateArray.length > 0){
     return cateArray.sort(function(a, b){return b.postIds.length - a.postIds.length}).slice(0,10);
     }else{
     return [];
     }
    //return Categories.find().fetch();
  }
});