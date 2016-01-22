import Ember from 'ember';

const { HistoryLocation } = Ember;

export default HistoryLocation.extend({
  /**
   * Scroll window to top only if new transition occurs, meaning that new state
   * is pushed to history. This way when user navigates back, page does not jump
   * to top.
   */
  
  pushState() {
    this._super(...arguments);

    window.scrollTo(0, 0);
  }
});
