/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 3:56
 * To change this template use File | Settings | File Templates.
 */
Template.postSubmit.helpers({
  categories: function() {
    return Categories.find();
  }
});
Template.postSubmit.events({
  'click .showCategoryModal':function(event){
    event.preventDefault();
    var callback = function(data, modalId){
      clearModal(modalId);
      if(data.result === "ok"){

      }
    };
    throwModal({
      type:"category",
      callback : callback
    });

  },
  /*'click .showImageModal':function(event){
    event.preventDefault();
    var callback = function(data, modalId){
      clearModal(modalId);
      if(data.result === "ok"){
        if(data.type==="ImageUrl" || data.type==="ImageUpload"){
          var imgTag = "<p><img src="+data.url +"></img></p><p>&nbsp;</p>";
          $('#content').html($('#content').html()+imgTag);
        }else if(data.type==="YoutubeUrl"){
          var imgTag = '<p><img alt="youtube" width="100%" name="'+data.url+'" src="http://img.youtube.com/vi/'+data.url+'/0.jpg"></p><p>&nbsp;</p>';
          //var youtubeTag = "<div class='embed-responsive embed-responsive-16by9'><iframe  class='embed-responsive-item' src=\"http://www.youtube.com/embed/"+data.url+ "\" frameborder=0></iframe></div>";
          $('#content').html($('#content').html()+imgTag);
        }*//*else if(data.type==="AceUrl"){
          $('#content').html($('#content').html()+"<pre>"+data.url+"</pre> <div> </div>");
        }*//*

      }
    };
    throwModal({
      type:"attach",
      callback : callback
    });
  },*/
  'submit form': function(event) {
    event.preventDefault();
    if($("#selectedCategory").val() == null || $("#selectedCategory").val() == ""){
      var callback = function(data, modalId){
        clearModal(modalId);
      };
      throwModal({
        type:"message",
        title : "알림",
        message : "카테고리를 선택하세요.",
        callback : callback
      });
      return false;
    }
    var post = {
      title: $(event.target).find('[name=title]').val(),
      content: $(event.target).find('#content').html(),
      keywords:$(event.target).find('.keywordText').val(),
      category : Categories.find().fetch().filter(function(category){return $("#selectedCategory").val() === category._id})[0] || null
    }
    var categoryId = post.category._id;
    Meteor.call('post', post, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        if (error.error === 302)
          Router.go('postPage', {_id: error.details});
      } else {

        Meteor.call('addCategory',{categoryId:categoryId,postId:id}, function(err){if(err){console.log(err)}});
        Router.go('postPage', {_id: id});
      }
    });
  }
});

Template.postSubmit.rendered = function(){

  if (!this.rendered){
    initMediumEditor("#content", 'post');
    //initEditor();
    /*initPenEditor( {
        editor: $("#content")[0], // {DOM Element} [required]
        class: 'content_pen_editor', // {String} class of the editor,
        debug: false, // {Boolean} false by default
        textarea: '<textarea name="content"></textarea>', // fallback for old browsers
        list: ['blockquote', 'h2', 'pre' , 'insertorderedlist', 'insertunorderedlist', 'bold', 'italic', 'createlink']
      }
    );*/


  }
};
