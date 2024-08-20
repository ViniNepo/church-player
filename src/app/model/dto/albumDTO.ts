import {SongDTO} from "./songDTO";

export class AlbumDTO {

  constructor(
  public id: string,
  public title: string,
  public image_url: string,
  public songs: SongDTO[]
){}
}
