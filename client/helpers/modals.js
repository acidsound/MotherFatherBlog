/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:34
 * To change this template use File | Settings | File Templates.
 */
Modals = new Meteor.Collection(null);

throwModal = function(modalOpt) {
  if(!$('body').hasClass('modal-open')){
    $('body').addClass('modal-open');
    var backFrop = $('<div class="modal-backdrop"></div>')
    $('body').append(backFrop);
    backFrop.fadeIn('slow');
  }
  Modals.insert(modalOpt)
}
clearModal = function(modalId) {
  if(Modals.find().count() == 1){
    $('body').removeClass('modal-open');
    $('.modal-backdrop').fadeOut("slow", function(){
      $(this).remove();
    });
    //$('.modal-backdrop').remove();
  }
  Modals.remove({_id:modalId});
}