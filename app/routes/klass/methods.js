import Ember from "ember";

const { Route, inject } = Ember;

export default Route.extend({
  ajax: inject.service(),

  model(){
    var name = this.modelFor('klass').name;
    return this.get('ajax').request(`docs/${name}/methods.json`);
  }
});
