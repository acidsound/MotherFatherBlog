/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 7. 23.
 * Time: 오전 9:39
 * To change this template use File | Settings | File Templates.
 */
Activities = new Meteor.Collection('activities');

ACTIVITY_TYPES={
  "create_post":{type:"post", method:"create",  message : "새로운 포스트", icon:"fa fa-file-text-o"},
  "update_post":{type:"post", method:"update",  message : "포스트 수정", icon:"fa fa-pencil"},
  "vote_post":{type:"post", method:"vote",  message : "엠지!", icon:"fa fa-thumbs-o-up"},
  "create_comment":{type:"comment", method:"create",message : "새로운 댓글", icon:"fa fa-comment-o"}
};

/*Activities.allow({
  update: ownsDocument,
  remove: ownsDocument
});*/

createActivity = function(typeKey, postId, creatorId, description){
  var creator = Meteor.users.findOne(creatorId);
  console.log(description);
  var opt = {
    postId: postId,
    userId: creatorId,
    creator: {name:creator.profile.name, photo:creator.profile.photo},
    submitted: new Date().getTime(),
    activity: ACTIVITY_TYPES[typeKey],
    description: description||""
  };
  Activities.insert(opt);
};