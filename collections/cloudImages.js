CloudImages = new Meteor.Collection("cloudImages");

CloudImages.allow({
  update: function(userId, doc) {
    return true;
  },
  remove:function(){return true;}
});