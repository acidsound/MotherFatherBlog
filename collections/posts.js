/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 2:47
 * To change this template use File | Settings | File Templates.
 */
Posts = new Meteor.Collection('posts');
Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});
/*Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);//url과 title만 수정 가능
  }
});*/
Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');

    console.log(postAttributes);
    if (!postAttributes.category)
      throw new Meteor.Error(423, 'Please choose a category');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302,
        'This link has already been posted',
        postWithSameLink._id);
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'title', 'content'), {
      userId: user._id,
      author: {name:user.profile.name,photo:user.profile.photo},
      submitted: new Date().getTime(),
      commentsCount: 0,
      hitCount:0,
      category : postAttributes.category    //짱난다 걍 통째로 갈아 넣어
    });

    var postId = Posts.insert(post);

    Categories.update(postAttributes.category._id,{"$push":{postIds:postId}});

    return postId;
  }
});/*
Meteor.methods({
  post: function(postAttributes) {
    // […]
    // pick out the whitelisted keys
    var user = Meteor.user();
    var post = _.extend(_.pick(postAttributes, 'url', 'message'), {
      title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
      userId: user._id,
      author: user.emails[0].address,
      submitted: new Date().getTime()
    });
    // wait for 5 seconds
    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.return();
      }, 5 * 1000);
      future.wait();
    }
    var postId = Posts.insert(post);
    return postId;
  }
});*/