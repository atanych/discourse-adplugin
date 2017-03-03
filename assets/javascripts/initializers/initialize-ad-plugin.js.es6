import PostModel from 'discourse/models/post';
import TopicModel from 'discourse/models/topic';
import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'initialize-ad-plugin',
  initialize(container) {
    const siteSettings = container.lookup('site-settings:main');

  	PostModel.reopen({
  	  postSpecificCountDFP: function() {
        return this.isNthPost(parseInt(siteSettings.dfp_nth_post_code));
  	  }.property('post_number'),

  	  postSpecificCountAdsense: function() {
        return this.isNthPost(parseInt(siteSettings.adsense_nth_post_code));
  	  }.property('post_number'),

      postSpecificCountAmazon: function() {
        return this.isNthPost(parseInt(siteSettings.amazon_nth_post_code));
      }.property('post_number'),

      isNthPost: function(n) {
  	    return true;
        if (n && n > 0) {
          return (this.get('post_number') % n) === 0;
        } else {
          return false;
        }
      }
  	});

  	TopicModel.reopen({
  	  postSpecificCountAdsense: function(index) {
  	      let n = parseInt(siteSettings.amazon_nth_post_code);
          if (n && n > 0) {
              return (index % n) === 0;
          } else {
              return false;
          }
  	  }
  	});

    withPluginApi('0.1', api => {

      api.decorateWidget('post-article:after', dec => {

          if (dec.canConnectComponent) {
              return dec.connect({ component: 'adplugin-container', context: 'model' });
          }

          // Old way for backwards compatibility
          return dec.connect({
              templateName: 'connectors/post-bottom/discourse-adplugin',
              context: 'model'
          });
      });

      api.decorateWidget('topic-list-item:after', dec => {

        if (dec.canConnectComponent) {
          return dec.connect({ component: 'adplugin-container', context: 'model' });
        }

        // Old way for backwards compatibility
        return dec.connect({
          templateName: 'connectors/post-bottom/discourse-adplugin',
          context: 'model'
        });
      });
    });
  }
};
