/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 2.
 * Time: 오전 9:37
 * To change this template use File | Settings | File Templates.
 */
Meteor.methods({
  save_url:function(response){
    CloudImages.insert(response.upload_data);
    console.log('Add '+response.upload_data.url+' to the id of '+response.context);
    //return response;
  }
});