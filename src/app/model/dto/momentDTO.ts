import {SongDTO} from "./songDTO";

export class MomentDTO {

  constructor(
    public id: number,
    public label: string,
    public subgroup: number,
    public song_Id: number,
    public worshipId: number,
    public song: SongDTO
  ) {
  }
}
