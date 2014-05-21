/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 21.
 * Time: 오후 4:34
 * To change this template use File | Settings | File Templates.
 */
Errors = new Meteor.Collection(null);

throwError = function(message) {
  Errors.insert({message: message, seen: false})
}
clearErrors = function() {
  Errors.remove({seen: true});
}