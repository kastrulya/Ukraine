/**
 * Created by bubble on 25.04.16.
 */
import {Component, OnInit, Input} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
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
    private _router: Router,
    private _routeParams: RouteParams,
    private _placeService: PlaceService
  ){}

  ngOnInit(){
    let objId = this._routeParams.get('objId');
    this.getPlace(objId);
  }

  getPlace(objId){
    this._placeService.getPlace(objId)
      .subscribe(
        place => {
          this.place = place;
          console.log(this.place);
        }
      //error => this.errorMessage = <any>error
        );
  }

  like(){
    this.place.likes += 1;
  }

  delete(){
    this._placeService.deletePlace(this.place).
                      subscribe(
                        ()=>{
                          let link = ['Places'];
                          this._router.navigate(link);
                        }
                      );
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
