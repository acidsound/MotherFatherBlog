/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 31.
 * Time: 오후 10:05
 * To change this template use File | Settings | File Templates.
 */
Template.category_modal.helpers({
  categories: function() {
    return Categories.find();
  }
});
Template.category_modal_category.helpers({
  enableDelete: function() {
    return this.postIds.length > 0 ? false : true;
  }
});
Template.category_modal.events({
  'click .okBtn':function(event){
    event.preventDefault();
    this.callback({result:"ok"}, this._id);
  },
  'click .add-category-btn':function(event){
    event.preventDefault();
    Meteor.call('category', {body:$("#categoryText").val()}, function(error, newCategory) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        if (error.error === 302)
          Router.go('postPage', {_id: error.details})
      } else {
        $("#categoryText").val("");
      }
    });
    //this.callback({result:"ok", body:}, this._id);
  },
  'click .delete-category':function(event){
    event.preventDefault();
    //한번 더 확인
    if(this.postIds.length > 0){
      return false;
    }
    Categories.remove({_id:this._id});
  }
});

