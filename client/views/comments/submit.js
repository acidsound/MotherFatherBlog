/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:51
 * To change this template use File | Settings | File Templates.
 */
Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('#content');
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    Meteor.call('comment', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        //$body.html('');
        $body.val('');
      }
    });
  }
});
Template.commentSubmit.rendered = function(){
  if (!this.rendered){
    // run my code
    console.log("rendered");
    $('#content').wysihtml5();
    //var editor = new MediumEditor('#content',{placeholder:"Comment on this post"});
  }
};