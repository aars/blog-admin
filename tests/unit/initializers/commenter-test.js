import Ember from 'ember';
import CommenterInitializer from '../../../initializers/commenter';
import { module, test } from 'qunit';

let registry, application, factories, injections;

module('Unit | Initializer | commenter', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
    application = stub(application);
  },
  afterEach: function() {
    factories = null;
    injections = null;
    application = null;
    registry = null;
  }
});

test('it registers commenters factory: model, injects into: service, serializer', function(assert) {
  CommenterInitializer.initialize(registry, application);

  let registered = Ember.A(factories.mapBy('name'));
  assert.ok(registered.contains('model:commenter'), 'model:commenter registered');
  let msg = 'commenters injected into service:store';
  assert.equal(injections.findBy('factory', 'service:store').property, 'commenters', msg);
  msg = 'serializer injected into service:commenters';
  assert.equal(injections.findBy('factory', 'service:commenters').property, 'serializer', msg);
});

function stub(app) {
  factories = Ember.A([]);
  injections = Ember.A([]);
  app.register = function(name, factory) {
    factories.push({name: name, factory: factory});
  };
  app.inject = function(factory, property, injection) {
    injections.push({
      factory: factory,
      property: property,
      injection: injection
    });
  };
  return app;
}
