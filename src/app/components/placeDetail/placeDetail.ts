/**
 * Created by bubble on 20.04.16.
 */

import {Component, Input} from 'angular2/core';
import {Place} from '../place/place';

@Component({
  selector: 'place-detail',
  templateUrl: 'app/components/placeDetail/placeDetail.html',
  //styleUrls: ['app/component/placeDetail/placeDetail.css']
})
export class PlaceDetail{
  @Input()
  place: Place;
}

