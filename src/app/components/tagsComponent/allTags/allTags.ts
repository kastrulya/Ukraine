/**
 * Created by bubble on 22.05.16.
 */
import {Component, Input} from "angular2/core";
import {TagDisplay} from "../tagDisplay/tagDisplay";
import {LikeService} from "../../../services/likeService";
import {DisplayTag} from "../../entities/DisplayTag";
import {AddTag} from "../addTag/addTag";
import {Place} from "../../entities/place";

@Component({
  selector: 'all-tags',
  templateUrl: 'app/components/tagsComponent/allTags/allTags.html',
  styleUrls: ['app/components/tagsComponent/allTags/allTags.css'],
  directives: [TagDisplay, AddTag]
})
export class AllTags {
  @Input()
  tags:DisplayTag;
  @Input()
  place: Place;
  constructor(
    private  _likeService:LikeService) {
  }
  
}
