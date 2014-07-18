/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 2:51
 * To change this template use File | Settings | File Templates.
 */


Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
});
Meteor.publish('singlePost', function(id) {
  //히트 수 증가. 여기가 최선이 아닐까...
  Posts.update(id, {$inc: {hitCount: 1}});
  return id && Posts.find(id);
});
Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});
Meteor.publish('categories', function() {
  return Categories.find();
});
Meteor.publish("chats", function() {
  return Chats.find();
});

Meteor.publish("rssfeed", function(query) {
  var self = this;
  // We got 3 helpers:
  // 1. self.setValue
  // 2. self.addItem
  // 3. self.cdata


  // query is the parsed querystring as an object
  // eg. foo=latest would be query.foo === 'latest'

  // feed handler helpers
  // this.cdata, this.setValue, this.addItem
  /*self.setValue('title', self.cdata('My news'));
  self.setValue('description', self.cdata('This is a live feed'));
  self.setValue('link', 'http://mysite.meteor.com');
  self.setValue('lastBuildDate', new Date());
  self.setValue('pubDate', new Date());
  self.setValue('ttl', 1);*/
  // managingEditor, webMaster, language, docs, generator

 /* Posts.find({}).forEach(function(doc) {
    self.addItem({
      title: doc.title,
      description: doc.content,
      url : 'http://www.underdogg.co.kr/posts/'+this._id,
      link: 'http://www.underdogg.co.kr/posts/'+this._id,
      author: this.author.name,
      language: 'ko',
      pubDate: new Date(),
      date: doc.submitted,
      ttl: '1'
    });
  });*/

  // feed handler helpers
  // this.cdata, this.setValue, this.addItem
  self.setValue('title', self.cdata('Underdogg'));
  self.setValue('description', self.cdata('This is a live feed'));
  self.setValue('link', 'http://underdogg.co.kr');
  self.setValue('lastBuildDate', new Date());
  self.setValue('pubDate', new Date());
  self.setValue('ttl', 1);
  // managingEditor, webMaster, language, docs, generator

  newsCollection.find({}).forEach(function(doc) {
    self.addItem({
      title: doc.title,
      description: doc.content,
      url : 'http://underdogg.co.kr/posts/'+this._id,
      link: 'http://underdogg.co.kr/posts/'+this._id,
      author: this.author.name,
      language: 'ko',
      pubDate: new Date(),
      date: doc.submitted,
      ttl: '1'
    });
  });

});

//Meteor.publish("userStatus", function() {
//  return Meteor.users.find({ "status.online": true });
//});
//"status.online": true
Meteor.publish(null, function() {
  return [
    Meteor.users.find({

    }, {
      fields: {
        status: 1,
        profile: 1
      }
    }), UserStatus.connections.find()
  ];
});