/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 3:07
 * To change this template use File | Settings | File Templates.
 */

// Redirect to a random URL, better handled client-side
//www.underdogg.co.kr => underdogg.co.kr로 리다이렉팅
WebApp.connectHandlers.use(function(req, res, next) {
  /*    if (!~req.headers.host.indexOf('localhost')) {

   }else{
   //로컬호스트 왜이러지 -_ ㅠ
   next();
   }*/
  /*res.writeHead(301, {
   'Location': 'http://underdogg.co.kr' +req.originalUrl
   });
   res.end();*/
  res.writeHead(307, {
    'Location': 'http://underdogg.co.kr' +req.originalUrl
  });
  res.end();

});
// 얜 어따 두냐 -_ - 나원 참
Meteor.startup(function() {
  if(Meteor.isClient){
    return SEO.config({
      title: 'UnderDoggggg',
      rel_icon: 'http://www.underdogg.co.kr/images/icon.png',
      meta: {
        'description': '작은 arm 보드에서 동작하고 있습니다. 만 지금은 임시로 다른 서버에서 동작하고 있다능 ㅠㅠ'
      },
      og: {
        'image': 'http://www.underdogg.co.kr/images/icon.png'
      }
    });
  }
});


Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('notifications'), Meteor.subscribe('categories'), Meteor.subscribe('posts'), Meteor.subscribe('chats') , Meteor.subscribe('cloudImages') ]
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
SearchListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  getSearchText: function(){
    if(this.params.searchText == ""|| this.params.searchText == null){
      Router.go('home');
    }else{
      return  this.params.searchText ;
    }
  },
  posts: function() {
    var opt = opt = {
      "title":{$regex:new RegExp(this.getSearchText(), 'i')},
      "content":{$regex:new RegExp(this.getSearchText(), 'i')}
    };
    return Posts.find(opt, this.findOptions());
  },
  nextPath: function() {
    return Router.routes.searchPosts.path({postsLimit: this.limit() + this.increment , searchText:this.getSearchText()})
  }
});
CategoryListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
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
    data: function() { return Posts.findOne(this.params._id); },
    onAfterAction: function() {
      var post;
      post = this.data();
      function stripHTMLtag(string) {
        var objStrip = new RegExp();
        objStrip = /[<][^>]*[>]/gi;
        return string.replace(objStrip, "");
      }
      var desc = stripHTMLtag(post.content||"").slice(0,130);
      //var images = post.content.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)||[];
      SEO.set({
        title: post.title,
        meta: {
          'description':  desc,
          author : post.author.name || "",
          keywords : post.category.body||"" + ","+post.keywords||""
        },
        og: {
          //'image': images,
          'title': post.title,
          'description': desc
        }
      });
    }
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
  this.route('searchPosts', {
    path: '/search/:searchText?/:postsLimit?',
    controller: SearchListController
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