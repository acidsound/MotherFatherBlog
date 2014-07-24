/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 31.
 * Time: 오후 10:05
 * To change this template use File | Settings | File Templates.
 */

//모달 버튼 콜백을 어케 전달하지????????

Template.activity_modal.helpers({
  activityList: function() {
    return Activities.find({},{sort: {submitted: -1, _id: -1}}).fetch();
  }
});
Template.activity_item.helpers({
  timeAgo: function(){
    return moment(this.submitted).fromNow()
  }
});