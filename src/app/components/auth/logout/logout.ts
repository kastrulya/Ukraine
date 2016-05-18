/**
 * Created by bubble on 18.05.16.
 */

/**
 * Created by bubble on 18.05.16.
 */

import {Component} from 'angular2/core';

@Component({
  selector: 'my-logout',
  templateUrl: 'app/components/auth/logout/logout.html'
})export class Logout {

  userLogout(user) {
    console.log("user has logout");
  }

  gotError(err) {
    console.log("error message - " + err.message);
    console.log("error code - " + err.statusCode);
  }

  logout(){
    console.log("current user: " + Backendless.LocalCache.get("current-user-id"));
    Backendless.UserService.logout( new Backendless.Async( this.userLogout, this.gotError ) );
  }

  isCurrUser() {
    return !!Backendless.LocalCache.get("current-user-id");
  }
}
