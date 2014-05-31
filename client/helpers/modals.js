/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:34
 * To change this template use File | Settings | File Templates.
 */
Modals = new Meteor.Collection(null);

throwModal = function(modalOpt) {
  $('body').addClass('modal-open');
  Modals.insert(modalOpt)
}
clearModal = function(modalId) {
  if(Modals.find().count() == 1){
    $('body').removeClass('modal-open');
  }
  Modals.remove({_id:modalId});
}