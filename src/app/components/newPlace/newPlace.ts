/**
 * Created by bubble on 25.04.16.
 */
import {Component} from 'angular2/core';
import {Place} from '../place/place';
import {PlaceService} from '../../services/place/placeService';

@Component({
  selector: 'new-place',
  templateUrl: 'app/components/newPlace/newPlace.html'
})
export class NewPlace {
  constructor(
    private _placeService: PlaceService
  ){}

  create(){
    let title = (<HTMLInputElement>document.getElementById("title")).value;
    let description = (<HTMLInputElement>document.getElementById("description")).value;
    let place = new Place(title, description);
    this._placeService.createPlace(place);

  }
}
