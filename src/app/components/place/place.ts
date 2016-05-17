/**
 * Created by bubble on 20.04.16.
 */
export class Place {
  constructor(
    public title : string,
    public description : string,
    public objectId : string = '',
    public likes : number = 0
  ){}
}
