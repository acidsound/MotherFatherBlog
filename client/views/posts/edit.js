var editor = null;
function initMedium (){
  var create = function(){
    editor = new MediumEditor('#content',{
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
Template.postEdit.events({
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

  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
     // url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      //content:  $(e.target).find('#content').data("wysihtml5").editor.getValue()
      content: $(e.target).find('#content').html()
    }

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});

Template.postEdit.rendered = function(){
  if (!this.rendered){
    // run my code
    /*var txtArea = $('#content').wysihtml5({
      "html": true
    });
    if(this.data.content){
      txtArea.data("wysihtml5").editor.setValue(this.data.content);
    }*/
    initMedium ();
    if(this.data.content){
      $('#content').html(this.data.content);
    }
  }
};