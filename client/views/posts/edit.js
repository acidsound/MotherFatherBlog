var editor = null;
function initEditor(){
  //에디터가 필요한 모든 페이지에서 끄응... 재사용 방법 없나???
  var options = {
    editor: $("#content")[0], // {DOM Element} [required]
    class: 'content_pen_editor', // {String} class of the editor,
    debug: false, // {Boolean} false by default
    textarea: '<textarea name="content"></textarea>', // fallback for old browsers
    list: ['blockquote', 'h2', 'pre' , 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent','bold', 'italic', 'createlink']
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
    initEditor ();
    if(this.data.content){
      $('#content').html(this.data.content);
    }
  }
};