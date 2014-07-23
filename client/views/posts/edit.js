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
  'click .showImageModal':function(event){
    event.preventDefault();
    var callback = function(data, modalId){
      //미친 이런 콜백이 가능할 줄은 꿈에도 몰랐다.
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

  'submit form': function(e) {
    e.preventDefault();
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

    var currentPostId = this._id;
    var userId =  this.userId;

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      //content:  $(e.target).find('#content').data("wysihtml5").editor.getValue()
      content: $(e.target).find('#content').html(),
      keywords:$(e.target).find('.keywordText').val(),
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
    Meteor.call('editPost', {postId:currentPostId, userId: userId, postProperties:postProperties}, function(error, id) {
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
    /*Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        //createActivity('update_post', currentPostId, userId);
        Router.go('postPage', {_id: currentPostId});
      }
    });*/


  },
  'click .focusPlz' : function(event){
    event.preventDefault();
    $('#content').focus();
  },
  'click .delete': function(e) {
    e.preventDefault();
    var currentPost = this;
    var callback = function(data, modalId){
      //미친 이런 콜백이 가능할 줄은 꿈에도 몰랐다.
      clearModal(modalId);
      if(data.result === "ok"){
        var currentPostId = currentPost._id;
        Categories.update(currentPost.category._id,{"$pull":{postIds:currentPostId}});
        Posts.remove(currentPostId);
        Router.go('home');
      }
    };
    throwModal({
      type:"message",
      title : "알림",
      message : "포스팅을 삭제할까요?",
      callback : callback,
      buttons:[
        {label: '취소', cssClass: 'btn closeBtn'},
        {label: '확인', cssClass: 'btn-success okBtn'}
      ]
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
    initPenEditor( {
        editor: $("#content")[0], // {DOM Element} [required]
        class: 'content_pen_editor', // {String} class of the editor,
        debug: false, // {Boolean} false by default
        textarea: '<textarea name="content"></textarea>', // fallback for old browsers
        list: ['blockquote', 'h2', 'pre' , 'insertorderedlist', 'insertunorderedlist', 'bold', 'italic', 'createlink']
      }
    );

    if(this.data.content){
      $('#content').html(this.data.content);
    }



  }
};