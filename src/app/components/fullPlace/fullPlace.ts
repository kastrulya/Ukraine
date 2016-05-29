/**
 * Created by bubble on 25.04.16.
 */
import {Component, OnInit} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {PlaceService} from "../../services/placeService";
import {LikeService} from "../../services/likeService";
import {Place} from "../entities/place";
import {DisplayTag} from "../entities/DisplayTag";
import {AllTags} from "../tagsComponent/allTags/allTags";
const Backendless = require('backendless');
// import GeoPoint = __Backendless.GeoPoint;


@Component({
  selector: 'full-place',
  templateUrl: 'app/components/full' +
  'Place/fullPlace.html',
  styleUrls: ['app/components/fullPlace/fullPlace.css'],
  directives: [AllTags]
})
export class FullPlace implements OnInit {
  place:Place;
  count:number;
  tags:DisplayTag[];
  user:Backendless.User;

  constructor(private _router:Router,
              private _routeParams:RouteParams,
              private _placeService:PlaceService,
              private  _likeService:LikeService) {
  }

  ngOnInit() {
    let objId = this._routeParams.get('objId');
    this.getPlace(objId);
    this.getTags(objId);
  }

  getPlace(objId) {
    this._placeService.getPlace(objId)
      .then(place => this.place = place);
  }

  delete() {
    this._placeService.deletePlace(this.place).then(
      ()=> {
        let link = ['Places'];
        this._router.navigate(link);
      }
    );
  }

  editDescription() {
    console.log('description will be changed');
    let field = <HTMLInputElement>document.getElementById('description');
    let button = document.getElementById('editDescription');
    this.toggleEditing(field, button);
  }

  editTitle(event) {
    console.log('title will be changed');
    let field = <HTMLInputElement>document.getElementById('title');
    let button = document.getElementById('editTitle');
    this.toggleEditing(field, button);
  }

  toggleEditing(field:HTMLInputElement, button:HTMLElement) {
    if (field.readOnly) {
      field.readOnly = false;
      field.focus();
    } else field.readOnly = true;
    button.classList.toggle('edited');
    button.classList.toggle('saved');
  }

  getTags(placeId : string) {
    return this._likeService
      .getLikedTags(placeId)
      .then(tagsCount => this.tags = tagsCount);
  }
  
  // isOwner(){
  //   return Backendless.UserService.getCurrentUser();
  // }

  edit(newTitle, newDescription){
    // editDescription.value();
    this.place.name = newTitle;
    this.place.description = newDescription;
    
    this.place.location = new Backendless.GeoPoint();
    this.place.location.latitude = 55.332;
    this.place.location.longitude = 30.453;
    
    this._placeService.updatePlace(this.place);
  }
  
}
