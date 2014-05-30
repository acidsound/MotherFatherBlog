/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 30.
 * Time: 오후 1:55
 * To change this template use File | Settings | File Templates.
 */
UI.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});