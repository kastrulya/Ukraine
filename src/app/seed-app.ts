import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {About} from './components/about/about';
import {Places} from './components/allPlaces/places';
import {FullPlace} from './components/fullPlace/fullPlace';
import {NewPlace} from './components/newPlace/newPlace';
import {PlaceService} from './services/place/placeService';

@Component({
  selector: 'seed-app',
  providers: [
    PlaceService
  ],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/seed-app.html',
})
@RouteConfig([
  { path: '/about',      component: About,       name: 'About' },
  { path: '/places',     component: Places,      name: 'Places', useAsDefault: true },
  { path: '/place/:title', component: FullPlace, name: 'FullPlace' },
  { path: 'places/add', component: NewPlace,     name: 'NewPlace' }
])
export class SeedApp {

  constructor() {}

}
