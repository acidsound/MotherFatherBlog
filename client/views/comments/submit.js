/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:51
 * To change this template use File | Settings | File Templates.
 */
var editor = null;
function initEditor(){
  //에디터가 필요한 모든 페이지에서 끄응... 재사용 방법 없나???
  var options = {
    editor: $("#content")[0], // {DOM Element} [required]
    class: 'content_pen_editor', // {String} class of the editor,
    debug: false, // {Boolean} false by default
    textarea: '<textarea name="content"></textarea>', // fallback for old browsers
    list: [ 'pre' , 'bold', 'italic', 'createlink']
  }
  var create = function(){
    editor = new Pen(options);
  };
  if(editor == null){
    create();
  }else{
    editor.destroy();
    editor = null;
    $('.content-menu').remove();
    create();
  }
}
Template.commentSubmit.events({
  'click .showModal':function(event){
    event.preventDefault();
    bootbox.prompt("Insert Image From URL", function(result) {
      if (result === null) {

      } else {
        var imgTag = "<div><img src="+result +"></img></div>";
        $('#content').html($('#content').html()+imgTag);
      }
    });
  },
  'submit form': function(e, template) {
    e.preventDefault();

    //var $body = $(e.target).find('#content');

    //console.log($body.val());
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
        initEditor ();

        //imsiEditor.body.html("");
        //$body.data("wysihtml5").editor.setValue("");
        //$('#content').activate();
        /*var editor = new MediumEditor('#content',{
          buttons : ['unorderedlist', 'orderedlist', 'pre','bold', 'italic', 'underline', 'anchor'],placeholder:"댓글을 작성하세요."
        });*/
      }
    });
  }
});
Template.commentSubmit.rendered = function(){
  if (!this.rendered){
    // run my code
    /*console.log("rendered");
    var commentArea = $('#content').wysihtml5({
      "font-styles": false, //Font styling, e.g. h1, h2, etc. Default true
      "emphasis": false //Italics, bold, etc. Default true
    });*/
  }
  /*var editor = new MediumEditor('#content',{
    targetBlank:true,
    buttons : ['unorderedlist', 'orderedlist', 'pre','bold', 'italic', 'underline', 'anchor'],placeholder:"댓글을 작성하세요."
  });*/
  initEditor ();
};