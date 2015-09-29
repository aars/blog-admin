import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Ember.Component.extend({
  tagName: 'form',

  resource: Ember.computed('post', function() {
    return BufferedProxy.create({ content: this.get('post') });
  }).readOnly(),

  isNew: null,
  isEditing: true,

  focusOut() {
    if (!this.get('isNew')) {
      this.get('resource').applyChanges();
    }
  },

  actions: {
    edit() {
      this.set('isEditing', true);
    },
    done() {
      this.set('isEditing', false);
    },
    save() {
      this.set('isEditing', false);
      this.get('resource').applyChanges();
      this.sendAction('on-save', this.get('post'));
    },
    cancel() {
      this.set('isEditing', false);
      this.get('resource').discardChanges();
      this.sendAction('on-cancel');
    }
  }
});
