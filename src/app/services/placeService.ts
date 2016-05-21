/**
 * Created by bubble on 25.04.16.
 */

//todo CRUD Place

import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptions} from "angular2/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Place} from "../components/entities/place";
const Backendless = require('backendless');

//var ListPlace: Place[] = [
//  new Place("lala", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore."),
//  new Place("PiyPiy", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore."),
//  new Place("Laylay", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore.")
//];

@Injectable()
export class PlaceService {

  private headers = new Headers({
    "application-id": "B0AC80E0-CF9A-FAAD-FFC1-D9494E29AB00",
    "secret-key": "6FBFFFC1-5C92-4EF4-FF21-2919B74DB300"
  });

  private placesURL = "https://api.backendless.com/v1/data/Place";

  private _options = new RequestOptions({headers: this.headers});

  constructor(private _http : Http){}

  extractData(res: Response){
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || body || {};
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  /* Create Read Update Delete */

  // createPlace(place:Place) : Observable<Place>{
  //   return this._http.post(this.placesURL, JSON.stringify(place), this._options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  createPlace(place: Place) : Promise<Place>{
    return Backendless.Data.of(Place).save(place);
  }

  getPlaces() {
    return Backendless.Data.of(Place).find();
  }

  getPlace(objId: string) : Promise<Place> {
    return Backendless.Data.of(Place).findById(objId);
  }

  updatePlace(place: Place) : Observable<Place>{
    let url = this.placesURL + '/' + place.objectId;
    return this._http.put(url, JSON.stringify(place) ,this._options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // deletePlace(place: Place) {
  //   let url = this.placesURL + '/' + place.objectId;
  //   return this._http.delete(url, this._options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  deletePlace(place:Place) {
    return Backendless.Data.of(Place).remove(place);
  }

  getUser(userId: string) {
    let userUrl = 'https://api.backendless.com/v1/data/Users' + '/' + userId;
    return this._http.get(userUrl, this._options)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
