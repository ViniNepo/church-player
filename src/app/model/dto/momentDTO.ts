import {SongWithAlbumDTO} from "./songDTO";

export class MomentDTO {
  constructor(
    public id: string,
    public title: string,
    public song_order: number,
    public song: SongWithAlbumDTO,
  ) {
  }
}

export class CreateMomentDTO {
  constructor(
    public title: string,
    public section_id: string,
  ) {
  }
}
