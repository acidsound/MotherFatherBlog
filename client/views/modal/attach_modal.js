/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 31.
 * Time: 오후 10:05
 * To change this template use File | Settings | File Templates.
 */

//모달 버튼 콜백을 어케 전달하지????????


Template.attach_modal.events({
  'click .closeBtn':function(event){
    event.preventDefault();
    this.callback({result:"cancel"}, this._id);
  },
  'click .okBtn':function(event){
    event.preventDefault();
    var data = {};
    data.result = "ok";
    if($("#ImageUrl").hasClass("active")){
      data.url =$("#ImageUrlInput").val();
      data.type ="ImageUrl";
    }else if($("#YoutubeUrl").hasClass("active")){
      data.url =$("#YoutubeUrlInput").val();
      data.type ="YoutubeUrl";
    }
    this.callback(data, this._id);
  }
});