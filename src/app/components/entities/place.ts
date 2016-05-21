import {Likes} from "./like";

export class Place {
  objectId : string;
  constructor(
    public name : string,
    public description : string
    // public likes : Array<Likes> = []
    // public ___class : string = "Place"
){}
}
