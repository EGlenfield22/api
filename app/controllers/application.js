import Ember from "ember";
import config from '../config/environment';

const { computed } = Ember;

export default Ember.Controller.extend({
  rev: config.rev,
  sha: config.sha,
  githubHREF: computed(function(){
    return `${config.githubUrl}/commits/${config.sha}`;
  }),

  actions: {
    scrollToTop: function(){
      window.scrollTo(0,0);
    },
    versionChanged(version){
      var parser = document.createElement('a');
      parser.href = window.location;

      var port = parser.port ? `:${parser.port}` : "";
      var location = [parser.protocol, '//', parser.hostname, port, '/', config.projectName, '/', version].join('');

      window.location = location;
    }
  }
});
