import {MomentDTO} from "./momentDTO";

export class SubgroupDTO {

  constructor(
    public id: number,
    public label: string,
    public moments: MomentDTO[],
  ) {
  }
}
