export class Song {
  constructor(
    public id: string,
    public title: string,
    public song_number: number,
    public file: string,
    public song_order: number,
    public album_id: string
  ) {
  }
}
