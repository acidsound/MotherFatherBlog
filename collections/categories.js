/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:41
 * To change this template use File | Settings | File Templates.
 */
Categories = new Meteor.Collection('categories');
Categories.allow({
  update: function(userId, doc) {
    return true;
  },
  remove:function(){return true;}
});
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
  },
  addCategory:function(postAttributes){
    //원래 posts.js Method post()안에 있었으나 망할 서버에만 올라가면 에러가 발생한다.
    //Uncaught Error: Inconsistent operator: {"_id":"hiaGq6oBSJgi6J9Gv","$addToSet":{"postIds":"9ZQLZdihm7Bz68Kbj"}} helpers.js:33
    //로컬에선 이상 없었음. 그렇다면 몽고 버전 문젠가.. 아무튼 이렇게 별도의 콜렉션 파일에서 처리하자.

    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    var category = Categories.findOne(postAttributes.categoryId);
    if (!category)
      throw new Meteor.Error(422, 'Post not found');
    if (_.include(category.postIds, postAttributes.postId))
      throw new Meteor.Error(422, 'Already upvoted this post');

    Categories.update({
      _id: postAttributes.categoryId,
      postIds: {$ne: postAttributes.postId}
    }, {
      $addToSet: {postIds: postAttributes.postId}
    });

  }
});

