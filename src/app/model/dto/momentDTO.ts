import {SongDTO} from "./songDTO";

export class MomentDTO {

  constructor(
    public id: number,
    public label: string,
    public songId: number,
    public worshipId: number,
    public song: SongDTO
  ) {
  }
}
