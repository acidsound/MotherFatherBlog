/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 31.
 * Time: 오후 10:05
 * To change this template use File | Settings | File Templates.
 */
$.cloudinary.config({
  cloud_name:"www-underdogg-co-kr"
});


Template.attach_modal.created = function(){
  Meteor.call("cloudinary_list_all",function(e,list){
    Session.set("image_list",list);
  });
  /*
  Session.set('c_upload.upload_successful');
  Session.set('c_upload.upload_failed');*/
}
Template.attach_modal.helpers({
  "stuff":function(){
    var user = Meteor.user();
    return {name:user.profile.name, _id:user._id}
  },
  "saved_images":function(){
    return CloudImages.find({},{sort:{"created_at":-1}});
  },
  "image_list":function(){
    return Session.get("image_list");
  }
});
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
    }else if($("#ImageUpload").hasClass("active")){
      data.url =$(".previewImage").attr("src");
      $(".previewImage").attr("src","");
      data.type ="ImageUpload";
    }else if($("#YoutubeUrl").hasClass("active")){
      data.url =$("#YoutubeUrlInput").val();
      data.type ="YoutubeUrl";
    }

    this.callback(data, this._id);
  },
  "click .image-item": function (event) {
    event.preventDefault();

    //어쩔수가 없다. 리스트에서 아이템 클릭 시 바로 팝업 닫히면서 전달되도록 해야하는게 ㅠㅠ
    //헐 여기서 this 는 Modal 객체가 아니라 이미지 객체이다. ㅎㄷ ㄷ
    //어케 땡겨오지 ;; 일단 Modals.findOne()이걸로...
    Modals.findOne().callback({result:"ok",url: this.url, type: "ImageUpload"}, Modals.findOne()._id);
  },
  "click .delete":function(){
    CloudImages.remove(this._id);
    Meteor.call("cloudinary_delete",this.public_id,function(e,r){
      if(!e){
        console.log(r);
      }
    });
  }
});

