Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
     // url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      content: $(e.target).find('#content').val()
      //content: $(e.target).find('#content').find('#content').html()
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
    $('#content').wysihtml5();
    $('#content').val(this.data.content);
    /*var editor = new MediumEditor('#content',{
      placeholder:""
    });
    $('#content').html(this.data.content);*/
    //console.log();
  }
};