import {MomentDTO} from "./momentDTO";

export interface WorshipDTO {
  id: number;
  name: string;
  image: string;
  moments: MomentDTO[];
}
