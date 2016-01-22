import Ember from "ember";

const { Route, inject } = Ember;

export default Route.extend({
  ajax: inject.service(),

  model(params){
    return this.get('ajax').request('docs/modules/%@.json'.fmt(params.moduleId));
  }
});
