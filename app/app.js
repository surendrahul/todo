import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

// Ember.onLoad('Ember.Application', function(Application) {
//   Application.initializer({
//     name: "injectStoreIntoMyComponent",
//     after: "store",
//     initialize: function(container, application) {      
//       application.inject('component:new-task', 'store', 'store:main');
//     }
//   });
// });


loadInitializers(App, config.modulePrefix);

export default App;
