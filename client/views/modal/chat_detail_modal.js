/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 31.
 * Time: 오후 10:05
 * To change this template use File | Settings | File Templates.
 */

//모달 버튼 콜백을 어케 전달하지????????

Template.chat_detail_modal.helpers({
  chatList: function(){
    return Chats.find({},{sort: {submitted: -1, _id: -1}}).fetch();
  }
});
Template.chat_item.helpers({
  submittedMoment : function(){
    return moment(this.submitted).fromNow();
  }
});
Template.chat_detail_modal.events({
  'click .closeBtn':function(event){
    event.preventDefault();
    this.callback({result:"cancel"}, this._id);
  },
  'click .okBtn':function(event){
    event.preventDefault();
    this.callback({result:"ok"}, this._id);
  },
  'click .writeBtn':function(event){
    console.log("chatMat");
    var body = $(".message").val()||"";
    Meteor.call('chat', {body:body}, function(error, newChat) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        if (error.error === 302)
          Router.go('postPage', {_id: error.details})
      } else {
        $(".message").val("");
      }
    });

  },
  'keypress input.message': function (evt, template) {
    if (evt.which === 13) {
      var body = $(".message").val()||"";
      Meteor.call('chat', {body:body}, function(error, newChat) {
        if (error) {
          // display the error to the user
          throwError(error.reason);
          if (error.error === 302)
            Router.go('postPage', {_id: error.details})
        } else {
          $(".message").val("");
        }
      });
    }
  }
});

