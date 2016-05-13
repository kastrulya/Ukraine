/**
 * Created by bubble on 25.04.16.
 */
import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Place} from '../place/place';
import {PlaceService} from '../../services/place/placeService';

@Component({
  selector: 'full-place',
  templateUrl: 'app/components/fullPlace/fullPlace.html',
  styleUrls: ['app/components/fullPlace/fullPlace.css']
})
export class FullPlace implements OnInit{
  place: Place;
  constructor (
    private _routeParams: RouteParams,
    private _placeService: PlaceService
  ){}

  ngOnInit(){
    let title = this._routeParams.get('title');
    this.place = this._placeService.getPlace(title);
  }

  like(){
    this.place.like += 1;
  }

  delete(){
    this._placeService.deletePlace(this.place);
    window.history.back();
  }


  editDescription(){
    console.log('description will be changed');
    let field = <HTMLInputElement>document.getElementById('description');
    let button = document.getElementById('editDescription');
    this.toggleEditing(field, button);
  }

  editTitle(event){
    console.log('title will be changed');
    let field = <HTMLInputElement>document.getElementById('title');
    let button = document.getElementById('editTitle');
    this.toggleEditing(field, button);
  }

  toggleEditing(field: HTMLInputElement, button: HTMLElement) {
    if (field.readOnly) {
      field.readOnly = false;
      field.focus();
    } else field.readOnly = true;
    button.classList.toggle('edited');
    button.classList.toggle('saved');
  }

}
