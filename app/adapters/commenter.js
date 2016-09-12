import ApplicationAdapter from './application';
import config from 'jr-test/config/environment';

export default ApplicationAdapter.extend({
  type: 'commenter',

  url: config.APP.API_PATH + '/commenters',

  /*fetchUrl: function(url) {
    const proxy = config.APP.API_HOST_PROXY;
    const host = config.APP.API_HOST;
    if (proxy && host) {
      url = url.replace(proxy, host);
    }
    return url;
  }*/
});
