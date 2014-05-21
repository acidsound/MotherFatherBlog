/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:45
 * To change this template use File | Settings | File Templates.
 */
Template.comment.helpers({
  submittedText: function() {
    return new Date(this.submitted).toString();
  }
});