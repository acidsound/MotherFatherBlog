/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:51
 * To change this template use File | Settings | File Templates.
 */
/*var initEditor = function(){
  initPenEditor( {
      editor: $("#content")[0], // {DOM Element} [required]
      class: 'content_pen_editor', // {String} class of the editor,
      debug: false, // {Boolean} false by default
      textarea: '<textarea name="content"></textarea>', // fallback for old browsers
      list: ['pre' , 'insertorderedlist', 'insertunorderedlist', 'bold', 'italic', 'createlink'],
      stay : false
    }
  );
};*/
Template.commentSubmit.events({
  'click .focusPlz' : function(event){
    event.preventDefault();
    $('#content').focus();
  },
  'click .showImageModal':function(event){
    event.preventDefault();
    var callback = function(data, modalId){
      clearModal(modalId);
      if(data.result === "ok"){
        if(data.type==="ImageUrl" || data.type==="ImageUpload"){
          var imgTag = "<div><img src="+data.url +"></img></div><div>&nbsp;</div>";
          $('#content').html($('#content').html()+imgTag);
        }else if(data.type==="YoutubeUrl"){
          var imgTag = '<div><img alt="youtube" width="100%" name="'+data.url+'" src="http://img.youtube.com/vi/'+data.url+'/0.jpg"></div><div>&nbsp;</div>';
          $('#content').html($('#content').html()+imgTag);
        }

      }
    };
    throwModal({
      type:"attach",
      callback : callback
    });
  },
  'submit form': function(e, template) {
    e.preventDefault();
    var imsiEditor = {body : $(e.target).find('#content')};
    var comment = {
      //body: $body.data("wysihtml5").editor.getValue(),
      body: imsiEditor.body.html(),
      postId: template.data._id
    };

    Meteor.call('comment', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        imsiEditor.body.html("");
        //initEditor();
      }
    });
  }
});
Template.commentSubmit.rendered = function(){
  if (!this.rendered){
    //initEditor();
    initMediumEditor("#content", {
      buttons: [ 'header2', 'pre' , 'bold', 'italic', 'anchor'],
      anchorInputPlaceholder: 'URL을 입력하세요.',
      placeholder:"댓글을 작성하세요.",
      targetBlank: true
    });
  }

};