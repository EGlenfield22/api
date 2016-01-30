import Ember from "ember";
import HasWaypoint from "../mixins/views/has-waypoint";
import config from '../config/environment';

const { Component, get, computed } = Ember;
const { alias } = computed;

export default Component.extend(HasWaypoint, {
  /*
    @action
  */
  'became-active': null,

  item: null,
  itemType: null,
  name: alias('item.name'),
  routeName: null,
  id: computed('item.name', 'itemType', function() {
    let itemType = get(this, 'itemType');
    let itemName = get(this, 'item.name');
    return `${itemType}_${itemName}}`;
  }).readOnly(),
  isPrivate: alias('item.isPrivate'),
  classNames: ['property', 'item-entry'],
  classNameBindings: ['isPrivate:private'],

  scrollTo(){
    var router = this.get('router');
    var routeName = this.get('routeName');
    var name = this.get('name');

    if (router.isActive(routeName, name)) {
      window.scrollTo(0, this.$().offset().top);
      this.sendAction('became-active');
    }
  },
  waypointBecameActive(){
    var router = this.get('router');
    var routeName = this.get('routeName');
    var name = this.get('name');

    router.replaceWith(routeName, name);
  },

  isVisible: computed('show-private', 'show-protected', 'show-deprecated',
                            'show-inherited', 'item.isPrivate', 'item.isProtected',
                            'item.inheritedFrom', 'item.isDeprecated',
                            function() {
    if (get(this, 'item.isPrivate')     && !get(this, 'show-private'))   { return false; }
    if (get(this, 'item.inheritedFrom') && !get(this, 'show-inherited')) { return false; }
    if (get(this, 'item.isProtected')   && !get(this, 'show-protected')) { return false; }
    if (get(this, 'item.isDeprecated')  && !get(this, 'show-deprecated')){ return false; }

    return true;
  }),
  /**
    The URL where you cand find the code for this property on github.
    TODO: don't link to blob/master,
    link to tree/<commit SHA: e.g. 5fe2d63>
    "https://github.com/emberjs/ember.js/tree/5fe2d63/packages/ember-application/lib/system/application.js#L551"

    @returns String
  */
  codeLocation: computed('item.file', 'item.line', function() {
    const itemFile = get(this, 'item.file');
    const itemLine = get(this, 'item.line');
    return `${config.githubUrl}/blob/${config.sha}/${itemFile}#L${itemLine}`;
  }).readOnly()
});
