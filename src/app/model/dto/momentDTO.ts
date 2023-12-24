import {SongDTO} from "./songDTO";

export interface MomentDTO {
  id: number;
  label: string
  songId: number;
  worshipId: number;
  song: SongDTO;
}
