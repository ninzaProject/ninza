// import { Router } from './internal'
import * as semantic from './semantic.min'
import { AppView } from './internal'
import { createConsumer } from '@rails/actioncable';

// router = new Router();

$(window).on('load', function() {
    Backbone.history.start();
    let appView = new AppView();
    
    window.onbeforeunload = function() {

    }
    
});
 