getProperty = function(object, property){
  // recursive function to get nested properties
  var array = property.split('.');
  if(array.length > 1){
    var parent = array.shift();
    // if our property is not at this level, call function again one level deeper if we can go deeper, else return null
    return (typeof object[parent] == "undefined") ? null : getProperty(object[parent], array.join('.'));
  }else{
    // else return property
    return object[array[0]];
  }
};

getUserName = function(user){
  return user.username
    || getProperty(user, 'services.twitter.screenName')
    || getProperty(user, 'services.facebook.username')
    || getProperty(user, 'services.google.name');
};

getSignupMethod = function(user){
  if(user.services && user.services.twitter) {
    return 'twitter';
  }else if(user.services && user.services.facebook) {
    return 'facebook';
  }else if(user.services && user.services.google) {
    return 'google';
  }else{
    return 'regular';
  }
};

Gravatar = {
  getGravatar: function(user, options) {
    if(user.email_hash){
      var options = options || {};

      var protocol = options.secure ? 'https' : 'http';
      delete options.secure;
      var hash = user.email_hash;
      var url = protocol + '://www.gravatar.com/avatar/' + hash;

      var params = _.map(options, function(val, key) { return key + "=" + val;}).join('&');
      if (params !== '')
        url += '?' + params;

      return url;
    }else if(user.services && user.services.twitter){
      return user.services.twitter.profile_image_url; //for the oauth-login avatar, diff for diff oauth, maybe it could be better
    }else if(user.services && user.services.facebook){
      return "http://graph.facebook.com/"+ user.services.facebook.id +"/picture";
    }else if(user.services && user.services.google){
      return user.services.google.picture;
    }
  }
};

getAvatarUrl = function(user){
  return Gravatar.getGravatar(user, {
    s: 80
  });
};


Accounts.onCreateUser(function(options, user) {
  /* facebook integration */
  return _.extend(user, {
    username: getUserName(user),
    profile: {
      photo: getAvatarUrl(user)
    }
  });
});
