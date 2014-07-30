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
var aceEditor = null;

Template.attach_modal.created = function(){

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
    return CloudImages.find({},{sort:{"created_at":-1}, limit:18});
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
      data.url =$('.image-item.select').attr("data-origin-src");
      data.type ="ImageUpload";
    }else if($("#YoutubeUrl").hasClass("active")){
      data.url =$("#YoutubeUrlInput").val();
      data.type ="YoutubeUrl";
    }
    this.callback(data, this._id);
  },
  "click .image-item": function (event) {
    event.preventDefault();
    $('.image-item').removeClass('select');
    $(event.currentTarget).addClass('select');
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

Template.attach_modal.rendered = function(){
  /*aceEditor = ace.edit("aceeditor");
  aceEditor.setTheme("ace/theme/xcode");
  aceEditor.getSession().setMode("ace/mode/javascript");
  aceEditor.setHighlightActiveLine(true);
  aceEditor.setReadOnly(false)*/
}
