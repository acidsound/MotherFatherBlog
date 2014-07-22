/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 7. 22.
 * Time: 오후 2:11
 * To change this template use File | Settings | File Templates.
 */

RssFeed.publish('rssfeed_posts.xml', function(query) {
  var self = this;

  self.setValue('title', self.cdata('UnderDogggggggg'));
  self.setValue('description', self.cdata('요리사가 자기 저녁밥 만들어 먹고 목수가 자기 집 신발장 짜고 치과 의사가 자기 이빨 신경치료 하듯 저도 제 홈페이지는 방구석에다 직접 구축을...목표'));
  self.setValue('feed_url', 'http://www.underdogg.co.kr/rss/rssfeed_posts');
  self.setValue('site_url', 'http://www.underdogg.co.kr');
  self.setValue('link', 'http://www.underdogg.co.kr');
  self.setValue('image_url', 'http://www.underdogg.co.kr/images/icon.png');
  self.setValue('docs', 'http://cyber.law.harvard.edu/rss/rss.html');
  self.setValue('author', self.cdata('이호성'));
  self.setValue('webMaster', self.cdata('이호성'));
  self.setValue('language', 'ko');
  self.setValue('categories', ['포스트']);
  self.setValue('lastBuildDate', new Date());
  self.setValue('pubDate', new Date());
  self.setValue('ttl', 60);
  // managingEditor, webMaster, language, docs, generator

  Posts.find({}).forEach(function(doc) {
    self.addItem({
      title: doc.title,
      description: doc.content,
      url: "http://www.underdogg.co.kr/posts/" +doc._id,
      link: "http://www.underdogg.co.kr/posts/" +doc._id,
      guid: doc._id, // optional - defaults to url
      author: doc.author.name, // optional - defaults to feed author property
      date: doc.submitted// any format that js Date can parse.
    });
  });
});