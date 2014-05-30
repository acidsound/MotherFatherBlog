/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 30.
 * Time: 오후 2:32
 * To change this template use File | Settings | File Templates.
 */
Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    var active = _.any(args, function(name) {

      return Router.current() && Router.current().route.name === name;
    });
    console.log(active);
    return active && 'active';
  },
  popularList: function() {
    //-_- 뭐냐 category.postIds.length 로 sort해야 하는데
    //aggregate는 안되는거 같고
    var cateArray = Categories.find().fetch();
    if(!!cateArray){
      return cateArray.sort(function(a, b){return b.postIds.length - a.postIds.length}).slice(0,10);
    }else{
      return [];
    }

  }
});