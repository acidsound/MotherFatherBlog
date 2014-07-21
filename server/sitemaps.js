/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 6.
 * Time: 오전 11:11
 * To change this template use File | Settings | File Templates.
 */
sitemaps.add('/posts_sitemap.xml', function() {
  var out = [], pages = Posts.find({},{sort:{submitted:-1}}).fetch();
  _.each(pages, function(page) {
    out.push({
      page: '/posts/'+page._id,
      lastmod: page.submitted,
      changefreq : "always"
    });
  });
  return out;
});