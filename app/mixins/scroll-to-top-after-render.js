import Ember from "ember";

const { run } = Ember;

export default Ember.Mixin.create({
  actions: {
    didTransition() {
      run.schedule('afterRender', () => {
        window.scrollTo(0,0);
      });
    }
  }
});
