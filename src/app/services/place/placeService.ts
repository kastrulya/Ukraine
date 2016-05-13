/**
 * Created by bubble on 25.04.16.
 */
import {Place} from '../../components/place/place';
import {Injectable} from 'angular2/core';

var ListPlace: Place[] = [
  new Place("lala", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore."),
  new Place("PiyPiy", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore."),
  new Place("Laylay", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci eaque earum esse est illum iste magnam modi odit veritatis. Aliquam corporis ea earum illo neque omnis quidem soluta tempore.", 36)
];

@Injectable()
export class PlaceService {
  getPlaces(){
    return ListPlace;
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
