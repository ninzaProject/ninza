// import { Router } from './internal'
import * as semantic from './semantic.min'
import { AppView } from './internal'

// router = new Router();

$(window).on('load', function() {
    Backbone.history.start();
    let appView = new AppView();
    }
);
