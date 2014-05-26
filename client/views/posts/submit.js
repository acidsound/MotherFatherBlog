/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 3:56
 * To change this template use File | Settings | File Templates.
 */

Template.postSubmit.events({
  'submit form': function(event) {
    event.preventDefault();
    var post = {
      //url: $(event.target).find('[name=url]').val(),
      title: $(event.target).find('[name=title]').val(),
      content: $(event.target).find('#content').data("wysihtml5").editor.getValue()
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
    /*$('#content').wysihtml5({
      "html": true
    });*/
    var txtArea = $('#content').wysihtml5({
      "html": true
    });



    //new MediumEditor('#content');
    //var editor = new MediumEditor('#content');
  }
};
