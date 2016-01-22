import Ember from "ember";
import config from '../config/environment';

const { Route, RSVP, inject } = Ember;

export default Route.extend({
  ajax: inject.service(),

  model(){
    var libraries, versions;
    var library  = this.get('ajax').request('docs/index.json');

    if (!config.singleLibraryEmbedded) {
      libraries = this.get('ajax').request('/config/libraries.json');
      versions = this.get('ajax').request(`${config.projectName}/versions.json`);
    }

    return RSVP.hash({
      library: library,
      libraries: libraries,
      versions: versions
    }).then(function(responses){
      var library = responses.library;
      library.libraries = responses.libraries;
      library.versions = responses.versions;

      return library;
    });
  }
});
