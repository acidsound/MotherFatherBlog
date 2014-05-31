/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 31.
 * Time: 오후 8:29
 * To change this template use File | Settings | File Templates.
 */
Template.modals.helpers({
  modals: function() {
    return Modals.find();
  }
});
Template.modal.helpers({
  dynamicTemplate: function() {
    return Template[this.type+"_modal"];
  }
});
