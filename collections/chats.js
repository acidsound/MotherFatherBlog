/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:41
 * To change this template use File | Settings | File Templates.
 */
Chats = new Meteor.Collection('chats');
Meteor.methods({
  chat: function(attributes) {
    var user = Meteor.user();
    // ensure the user is logged in

    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    if (!attributes.body)
      throw new Meteor.Error(422, 'Please write some text');

    var chat = _.extend(_.pick(attributes, 'body'), {
      userId: user._id,
      author: {name:user.profile.name,photo:user.profile.photo},
      submitted: new Date().getTime()
    });

    chat._id = Chats.insert(chat);


    console.log(chat);

    return chat;
  }
});

