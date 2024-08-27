import {MomentDTO} from "./momentDTO";
import {SectionDTO} from "./sectionDTO";

export class WorshipDTO {

  constructor(
    public id: string,
    public title: string,
    public image_url: string,
    public sections: SectionDTO[]
  ) {
  }
}
