import {SongWithAlbumDTO} from "./songDTO";

export class MomentDTO {
  constructor(
    public id: string,
    public title: string,
    public song_order: number,
    public section_id: string,
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

export class MomentOrderDTO {
  constructor(
    public id: string,
    public song_order: number,
    public section_id: string,
  ) {
  }
}
