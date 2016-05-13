/**
 * Created by bubble on 20.04.16.
 */
export class Place {
  constructor(
    public title:string,
    public description: string,
    public like: number = 0,
    public tags: string[] = []
  ){}
}
