/**
 * Created by bubble on 20.04.16.
 */

import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {Place} from '../place/place';
import {PlaceDetail} from '../placeDetail/placeDetail';

import {PlaceService} from '../../services/place/placeService';

@Component({
  selector: 'places',
  templateUrl: 'app/components/allPlaces/allPlaces.html',
  directives: [PlaceDetail]
})
export class Places implements OnInit{
  places :Place[];
  constructor(
    private _router: Router,
    private _placeService: PlaceService
  ){}

  ngOnInit(){
    //this.places = this._placeService.getPlaces();
    this.getPlaces();
  }

  getPlaces(){
    this._placeService.getPlaces()
                      .subscribe(
                        places => this.places = places
                        //error => this.errorMessage = <any>error
                        );
  }

  onSelect(place){
    //
  }
  gotoDetail(place: Place){
    let link = ['FullPlace', {title: place.title}];
    this._router.navigate(link);
  }

  addNewPlace(){
    let link = ['NewPlace'];
    this._router.navigate(link);
  }

}
