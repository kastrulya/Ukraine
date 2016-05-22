/**
 * Created by bubble on 22.05.16.
 */
///todo: add tag to place

import {Component, Input} from "angular2/core";
import {LikeService} from "../../../services/likeService";
import {Place} from "../../entities/place";

@Component({
  selector: 'add-tag',
  templateUrl: 'app/components/tagsComponent/addTag/addTag.html',
  styleUrls: ['app/components/tagsComponent/addTag/addTag.css']
})
export class AddTag {
  @Input()
  place: Place;
  constructor(
    private  _likeService:LikeService) {
  }

  toggleField(){
    
  }
}
