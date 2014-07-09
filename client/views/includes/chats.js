/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 30.
 * Time: 오후 3:08
 * To change this template use File | Settings | File Templates.
 */
Template.chats.helpers({
  chatList: function(){
    //좀 병신같긴한데...
    var item = Chats.find({},{sort: {submitted: -1, _id: -1}, limit:5}).fetch();
    return item.reverse();
  }
});
var chat_scrollBottom = function(){
  $('.chat-wrapper').animate({
    scrollTop: $('.chat-wrapper')[0].scrollHeight
  }, 500);
};
Template.chat.helpers({
  submittedMoment : function(){
    return moment(this.submitted).fromNow();
  }
});
Template.chats.events({
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
  },
  'keypress .bottom-form__input': function (evt, template) {
    if (evt.which === 13) {
      var body = $(".bottom-form__input").text()||"";
      Meteor.call('chat', {body:body}, function(error, newChat) {
        if (error) {
          // display the error to the user
          throwError(error.reason);
          if (error.error === 302)
            Router.go('postPage', {_id: error.details})
        } else {
          $(".bottom-form__input").text("");
        }
      });
    }
  },
  'click .showDetail':function(event){
    event.preventDefault();
    var callback = function(data, modalId){
      //미친 이런 콜백이 가능할 줄은 꿈에도 몰랐다.
      clearModal(modalId);
      if(data.result === "ok"){
      }
    };
    throwModal({
      type:"chat_detail",
      callback : callback
    });

  }
});