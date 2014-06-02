/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 2.
 * Time: 오전 9:37
 * To change this template use File | Settings | File Templates.
 */
Meteor.methods({
  save_url:function(response){
    console.log('Add '+response.upload_data+' to the id of '+response.context);
    //return response;
  }
});