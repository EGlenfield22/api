import Ember from "ember";
import ScrollToTopAfterRenderMixin from '../mixins/scroll-to-top-after-render';

const { Route, inject } = Ember;

export default Route.extend(ScrollToTopAfterRenderMixin, {
  ajax: inject.service(),

  model(params){
    return this.get('ajax').request('docs/modules/%@.json'.fmt(params.moduleId));
  }
});
