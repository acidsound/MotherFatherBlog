/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 29.
 * Time: 오전 10:00
 * To change this template use File | Settings | File Templates.
 */
Template.recently_activities.helpers({
  activityList: function() {
    return Activities.find({},{sort: {submitted: -1, _id: -1}, limit:5}).fetch();
  }
});

Template.recently_activity.helpers({
  timeAgo: function(){
    return moment(this.submitted).fromNow()
  },
  timeClass: function() {
    //생성일에 하루 더한게 오늘 날짜보다 크면 success
    if(moment(this.submitted).add('d',1) > moment(new Date())){
      /*if(this.activity.type == "post"){
        var badgeClass = "badge-warning";
        if(this.activity.method =="create"){
          badgeClass = "badge-warning";
        }else {
          badgeClass = "badge-primary";
        }
        return badgeClass;
      }else{
        return "badge-success";
      }*/
      return "badge-default";
    }
  }
});