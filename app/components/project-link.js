import Ember from "ember";
import config from '../config/environment';

const { Component, get, computed } = Ember;

export default Component.extend({
  file: null,
  line: null,
  tagName: 'a',
  attributeBindings: ['href'],
  href: computed('file', 'line', function(){
    const itemFile = get(this, 'file');
    const itemLine = get(this, 'line');
    return `${config.githubUrl}/tree/${config.sha}/${itemFile}#L${itemLine}`;
  })
});
