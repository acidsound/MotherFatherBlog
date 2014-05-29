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
Template.postEdit.helpers({
  categories: function() {
    var currentPost = this;
    var categories = Categories.find().fetch();
    _.forEach(categories,function(category){
      if(!!currentPost.category){
        category.isSelected = currentPost.category._id == category._id ? true : false;
      }

    });
    return categories;
  }
});
Template.postEdit.events({
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
  'click .showImageModal':function(event){
    event.preventDefault();
    bootbox.prompt("Insert Image From URL", function(result) {
      if (result === null) {

      } else {
        var imgTag = "<div><img src="+result +"></img></div><div>&nbsp;</div>";
        $('#content').html($('#content').html()+imgTag);
      }
    });
  },

  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      //content:  $(e.target).find('#content').data("wysihtml5").editor.getValue()
      content: $(e.target).find('#content').html(),
      category : Categories.find().fetch().filter(function(category){return $("#selectedCategory").val() === category._id})[0]
    }

    //왐마 카테고리 어쩐데
    if(this.category == null){  //기존에 만들어놓은 포스팅 때문에 ㅠㅠ
      Categories.update(postProperties.category._id,{"$push":{postIds:currentPostId}});
    }else if(postProperties.category._id !== this.category._id){
      // 카테고리에 변경사항이 있으면 기존 카테고리에서 pull, 새 카테고리에 push
      // 이 모든 헛짓거리는 popular Category 때문

      Categories.update(this.category._id,{"$pull":{postIds:currentPostId}});

      Categories.update(postProperties.category._id,{"$push":{postIds:currentPostId}});
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
    var currentPost = this;
    bootbox.confirm("Delete this post? 레알?", function(result) {
      if (result) {
        var currentPostId = currentPost._id;

        Categories.update(currentPost.category._id,{"$pull":{postIds:currentPostId}});

        Posts.remove(currentPostId);
        Router.go('postsList');
      } else {
      }
    });
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