import * as semantic from './semantic.min'
import { AppView } from './internal'

import { app } from './internal'

$(window).on('load', function() {
  Backbone.history.start();
  app.app_view = new AppView();
  }
);
