import {Song} from "../song";
import {Album} from "../album";

export class HistoryDTO {

  constructor(
    public id: number,
    public songId: number,
    public albumId: number,
    public song: Song,
    public album: Album
  ) {
  }
}

export class IdDTO {

  constructor(
    public id: number,
    public songId: number,
    public albumId: number,
  ) {
  }
}
