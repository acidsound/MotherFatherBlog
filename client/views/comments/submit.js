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
  var editor = new MediumEditor('#content',{
    buttons : ['unorderedlist', 'orderedlist', 'pre','bold', 'italic', 'underline', 'anchor'],placeholder:"댓글을 작성하세요."
  });
};