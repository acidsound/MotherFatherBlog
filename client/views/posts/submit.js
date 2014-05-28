/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 3:56
 * To change this template use File | Settings | File Templates.
 */
var editor = null;
function initMedium (){
  var create = function(){
    editor = new MediumEditor('#content',{
      targetBlank:true,
      buttons : ['header2',  'quote', 'unorderedlist', 'orderedlist', 'pre', 'bold', 'italic', 'underline', 'anchor','strikethrough'],placeholder:"본문을 작성하세요."
    });
  };

  if(editor == null){
    create();
  }else{
    var toolbarId = "#medium-editor-toolbar-"+editor.id, anchorId = "#medium-editor-anchor-preview-"+editor.id;
    $(toolbarId).remove();
    $(anchorId).remove();
    editor = null;
    create();
  }
}
Template.postSubmit.events({
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
  'submit form': function(event) {
    event.preventDefault();
    var post = {
      //url: $(event.target).find('[name=url]').val(),
      title: $(event.target).find('[name=title]').val(),
      //content: $(event.target).find('#content').data("wysihtml5").editor.getValue()
      content: $(event.target).find('#content').html()
    }
    Meteor.call('post', post, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        if (error.error === 302)
          Router.go('postPage', {_id: error.details})
      } else {
        Router.go('postPage', {_id: id});
      }
    });
  }
});

Template.postSubmit.rendered = function(){
  if (!this.rendered){
    // run my code
    console.log("rendered");
    /*var txtArea = $('#content').wysihtml5({
      "html": true
    });*/

    initMedium ();

  }
};
