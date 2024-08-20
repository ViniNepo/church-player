export class MomentDTO {

  constructor(
    public id: number,
    public label: string,
    public subgroup: string,
    public worshipId: number,
    public song_Id: number,
    public song_name: string,
    public album_name: string,
  ) {
  }
}
