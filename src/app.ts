import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {SeedApp} from './app/seed-app';

const Backendless = require('backendless');

var APP_ID:string = 'B0AC80E0-CF9A-FAAD-FFC1-D9494E29AB00';
var APP_KEY:string = '44DF80AC-A385-0F97-FF75-B21ABFC0BB00';
var APP_VER:string = 'v1';
Backendless.initApp(APP_ID, APP_KEY, APP_VER);

bootstrap(SeedApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
])
.catch(err => console.error(err));
