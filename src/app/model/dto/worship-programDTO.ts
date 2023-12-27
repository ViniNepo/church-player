import {MomentDTO} from "./momentDTO";

export class WorshipDTO {

  constructor(
    public id: number,
    public name: string,
    public image: string,
    public moments: MomentDTO[]
  ) {
  }
}
