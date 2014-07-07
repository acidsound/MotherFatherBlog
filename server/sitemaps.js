/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 6.
 * Time: 오전 11:11
 * To change this template use File | Settings | File Templates.
 */
sitemaps.add('/posts_sitemap.xml', function() {
  var out = [], pages = Posts.find().fetch();
  _.each(pages, function(page) {
    out.unshift({
      page: '/posts/'+page._id,
      lastmod: page.submitted,
      changefreq : "daily"
    });
  });
  return out;
});