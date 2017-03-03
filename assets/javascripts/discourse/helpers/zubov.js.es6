import { htmlHelper } from 'discourse-common/lib/helpers';

export default Ember.Helper.extend({
    compute(params, hash) {
        let topic = params[0];
        let index = params[1];
        return topic.postSpecificCountAdsense(index);
    }
});