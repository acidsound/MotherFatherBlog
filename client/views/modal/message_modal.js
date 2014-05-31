/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 31.
 * Time: 오후 10:05
 * To change this template use File | Settings | File Templates.
 */
Template.message_modal.events({
  'click .closeBtn':function(event){
    event.preventDefault();
    this.callback({result:"close"}, this._id);
  },
  'click .okBtn':function(event){
    event.preventDefault();
    console.log(this._id);
    this.callback({result:"ok"}, this._id);
    $("#urlText").val("");
    //clearModal(this._id);
  }
});
