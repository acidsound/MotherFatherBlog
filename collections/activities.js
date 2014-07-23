/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 7. 23.
 * Time: 오전 9:39
 * To change this template use File | Settings | File Templates.
 */
Activities = new Meteor.Collection('activities');

ACTIVITY_TYPES={
  "create_post":{type:"post", method:"create",  message : "새 포스트", icon:"fa fa-file-text-o"},
  "create_comment":{type:"comment", method:"create",message : "새 댓글", icon:"fa fa-comment-o"}
};

Activities.allow({
  update: ownsDocument
});

createActivity = function(typeKey, postId, creatorId){
  var creator = Meteor.users.findOne(creatorId);
  console.log(typeKey);
  var opt = {
    postId: postId,
    creator: {name:creator.profile.name, photo:creator.profile.photo},
    submitted: new Date().getTime(),
    activity: ACTIVITY_TYPES[typeKey]
  };
  Activities.insert(opt);
};