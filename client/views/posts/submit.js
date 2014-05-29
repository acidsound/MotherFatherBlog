/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 3:56
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
Template.postSubmit.helpers({
  categories: function() {
    return Categories.find();
  }
});
Template.postSubmit.events({
  'click .showCategoryModal':function(event){
    event.preventDefault();
    bootbox.prompt("새 카테고리를 추가합니다.", function(result) {
      if (result == null || result == "") {
      } else {
        Meteor.call('category', {body:result}, function(error, newCategory) {
          if (error) {
            // display the error to the user
            throwError(error.reason);
            if (error.error === 302)
              Router.go('postPage', {_id: error.details})
          } else {
            $("#selectedCategory").val(newCategory._id);
          }
        });

      }
    });
  },
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

    console.log(this);
    console.log(Categories);
    var post = {
      title: $(event.target).find('[name=title]').val(),
      content: $(event.target).find('#content').html(),
      category : Categories.find().fetch().filter(function(category){return $("#selectedCategory").val() === category._id})[0] || null
    }
    Meteor.call('post', post, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        if (error.error === 302)
          Router.go('postPage', {_id: error.details});
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
    initEditor();
  }
};
