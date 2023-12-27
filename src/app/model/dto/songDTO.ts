import {Album} from "../album";

export class SongDTO {

  constructor(
    public id: number,
    public name: string,
    public number: string,
    public times_played: number,
    public file: string,
    public albumId: number,
    public album: Album
  ) {}

}
