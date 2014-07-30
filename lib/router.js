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
    return [Meteor.subscribe('notifications'),Meteor.subscribe('activities'), Meteor.subscribe('categories'), Meteor.subscribe('posts'), Meteor.subscribe('chats') , Meteor.subscribe('cloudImages') ]
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
    controller: NewPostsListController,
    waitOn: function() {
      $("body").animate({ scrollTop: 0 }, "fast");
    }
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
    ,
    onAfterAction: function() {
      var post = this.data();
      // 정규식으로 개 지랄하느니 이렇게 하는게 낫겠다
      var elements = $('<div>').html(post.content);
      var desc = elements.text().slice(0,130);
      SEO.set({
        title: post.title,
        meta: {
          'description':  desc,
          author : post.author.name || "",
          keywords : post.category.body||"" + ","+post.keywords||""
        },
        og: {
          'title': post.title,
          'description': desc,
          'image': elements.find('img').eq(0).attr('src')||"http://www.underdogg.co.kr/images/icon.png"
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
  //와 씨발 이 코드 떄문에 세시간 삽질했네
  //postEdit, commentSubmit에서 에디팅을 하다가 브라우저를 백그라운드로 돌려도 아무 문제 없는데
  //postSubmit에서 에디팅 할때만 백그라운드로 가면 requireLogin을 타서 destroyMediumEditor얘를 죽인다
  if(this.route.name !== "postSubmit"){
    destroyMediumEditor();  //에디터를 자동으로 죽여줄 묘책이 없는 관계로
  }
  clearErrors();
});