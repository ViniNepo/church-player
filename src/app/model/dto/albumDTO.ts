import {Album} from "../album";
import {SongDTO} from "./songDTO";

export interface AlbumDTO {
  id: number;
  name: string;
  image: string;
  songs: SongDTO[];
}
