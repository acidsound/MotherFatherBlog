/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 3:07
 * To change this template use File | Settings | File Templates.
 */


Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('notifications'), Meteor.subscribe('categories'), Meteor.subscribe('posts'), Meteor.subscribe('chats')  ]
  }

});
PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  limit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    if(this.limit() < 5){
      $("body").animate({ scrollTop: 0 }, "fast");
    }
    return Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {

    var hasMore = this.posts().count() === this.limit();
    return {
      posts: this.posts(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});
NewPostsListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
  }
});
BestPostsListController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment})
  }
});

CategoryListController = PostsListController.extend({
  category: function(){
    return  this.params.postsCategory || "all";
  },
  posts: function() {
    var opt = {};
    if(this.category() != "all"){
      opt = {"category._id":this.category()}
    }
    return Posts.find(opt, this.findOptions());
  },
  nextPath: function() {
    return Router.routes.categoryList.path({postsLimit: this.limit() + this.increment, postsCategory:this.category()})
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    controller: NewPostsListController
  });
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      $("body").animate({ scrollTop: 0 }, "fast");
      return [
        Meteor.subscribe('singlePost', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });
  this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() {
      $("body").animate({ scrollTop: 0 }, "fast");
      return [Meteor.subscribe('singlePost', this.params._id), Meteor.subscribe('categories')];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });
  this.route('postSubmit', {
    path: '/submit',
    waitOn: function() {
      $("body").animate({ scrollTop: 0 }, "fast");
      return Meteor.subscribe('categories');
    }
  });
  this.route('newPosts', {
    path: '/new/:postsLimit?',
    controller: NewPostsListController
  });
  this.route('bestPosts', {
    path: '/best/:postsLimit?',
    controller: BestPostsListController
  });
  this.route('categoryList', {
    path: 'category/:postsCategory?/:postsLimit?',
    controller: CategoryListController
  });
});
var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function() {
  //destroyPenEditor();
  clearErrors()
});