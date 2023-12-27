import {SongDTO} from "./songDTO";

export class AlbumDTO {

  constructor(
  public id: number,
  public name: string,
  public image: string,
  public songs: SongDTO[]
){}
}
