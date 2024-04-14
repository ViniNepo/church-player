import {MomentDTO} from "./momentDTO";
import {SubgroupDTO} from "./subgroupDTO";

export class WorshipDTO {

  constructor(
    public id: number,
    public name: string,
    public image: string,
    public subgroup: SubgroupDTO[]
  ) {
  }
}
