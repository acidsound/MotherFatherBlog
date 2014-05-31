/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 30.
 * Time: 오후 3:08
 * To change this template use File | Settings | File Templates.
 */
Template.chats.helpers({
  chatList: function(){
    return Chats.find().fetch().reverse();
  }
});

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
  }
});