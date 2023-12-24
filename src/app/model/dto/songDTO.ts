import {Album} from "../album";

export interface SongDTO {
  id: number;
  name: string;
  number: number;
  times_played: number;
  file: string;
  album: Album;
}
