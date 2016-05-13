/**
 * Created by bubble on 25.04.16.
 */

//todo CRUD Place

import {Place} from '../../components/place/place';
import {Injectable} from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';

var ListPlace: Place[] = [
  new Place("lala", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore."),
  new Place("PiyPiy", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore."),
  new Place("Laylay", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore.", 36)
];

@Injectable()
export class PlaceService {

  private headers = new Headers({
    "application-id": "B0AC80E0-CF9A-FAAD-FFC1-D9494E29AB00",
    "secret-key": "6FBFFFC1-5C92-4EF4-FF21-2919B74DB300"
  });

  private _options = new RequestOptions({headers: this.headers});

  constructor(private _http : Http){}

  getPlaces() : Observable<Place[]>{
    let placesURL = "https://api.backendless.com/v1/data/Place";
    return this._http.get(placesURL, this._options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  extractData(res: Response){
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getPlace(title: string) {
    return ListPlace.filter(place => place.title == title)[0];
  }

  deletePlace(place: Place) {
    let placeIndex = ListPlace.indexOf(place);
    ListPlace.splice(placeIndex, 1);
    return ListPlace;
  }

  createPlace(place:Place){
    ListPlace.push(place);
    return ListPlace;
  }
}
