import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {About} from "./components/about/about";
import {Places} from "./components/allPlaces/places";
import {FullPlace} from "./components/fullPlace/fullPlace";
import {NewPlace} from "./components/newPlace/newPlace";
import {PlaceService} from "./services/placeService";
import {LikeService} from "./services/likeService";
import {Register} from "./components/auth/register/register";
import {Login} from "./components/auth/login/login";
import {Auth} from "./components/auth/auth";
//import {Logout} from './components/auth/logout/logout';

@Component({
  selector: 'seed-app',
  providers: [
    PlaceService, LikeService
  ],
  pipes: [],
  directives: [ROUTER_DIRECTIVES, Auth],
  templateUrl: 'app/seed-app.html',
})
@RouteConfig([
  { path: '/about',      component: About,       name: 'About' },
  { path: '/places',     component: Places,      name: 'Places', useAsDefault: true },
  { path: '/place/:objId', component: FullPlace, name: 'FullPlace' },
  { path: 'places/add', component: NewPlace,     name: 'NewPlace' },
  { path: 'register', component: Register, name: 'Register' },
  { path: 'login', component: Login, name: 'Login' }
])
export class SeedApp {

  constructor() {}

}
