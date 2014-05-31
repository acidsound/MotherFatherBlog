/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:34
 * To change this template use File | Settings | File Templates.
 */
Modals = new Meteor.Collection(null);

throwModal = function(modalOpt) {
  /*var opt = {
    message : "",
    title : "",
    buttons:[
      {result: 'ok', label: '확인', cssClass: 'btn-success'}
    ]
  };*/
  Modals.insert(modalOpt)
}
clearModal = function(modalId) {
  Modals.remove({_id:modalId});
}