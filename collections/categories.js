/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:41
 * To change this template use File | Settings | File Templates.
 */
Categories = new Meteor.Collection('categories');
Meteor.methods({
  category: function(categoryAttributes) {
    var user = Meteor.user();
    // ensure the user is logged in

    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    if (!categoryAttributes.body)
      throw new Meteor.Error(422, 'Please write some text');

    var existCategory = Categories.find({"body":categoryAttributes.body});
    if(existCategory.length > 0){
      throw new Meteor.Error(401, "exist category man");
    }

    var category = _.extend(_.pick(categoryAttributes, 'body'), {
      userId: user._id,
      author: {name:user.profile.name,photo:user.profile.photo},
      submitted: new Date().getTime(),
      postIds :[]
    });

    category._id = Categories.insert(category);
    // now create a notification, informing the user that there's been a comment

    return category;
  }
});

