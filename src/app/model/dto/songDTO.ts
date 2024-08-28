export class SongDTO {

  constructor(
    public id: string,
    public title: string,
    public song_number: number,
    public file: string,
    public song_order: number,
  ) {}

}

export class CreateSongDTO {

  constructor(
    public file_name: string,
    public album_id: string
  ) {}

}

export class SongUpdateOrderDTO {
  constructor(
    public id: string,
    public song_order: number
  ) {
  }
}

export class SongWithAlbumDTO {
  constructor(
    public id: string,
    public title: string,
    public file: string,
    public song_number: number,
    public song_order: number,
    public album_id: string,
    public album_name: string,
    public album_image_url: string
  ) {
  }
}
