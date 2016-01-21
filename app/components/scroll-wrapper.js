import Ember from 'ember';

const { on } = Ember;

export default Ember.Component.extend({
  returnToTopLinkVisible: false,

  observeScrollState: on('didInsertElement', function(){
    var _this = this;
    new window.Waypoint({
      element: this.element,
      continuous: false,
      offset: 40,
      handler: function(direction) {
        var isReturnToTopLinkVisible = direction === 'down';
        _this.set('returnToTopLinkVisible', isReturnToTopLinkVisible);
      }
    });
  })
});
