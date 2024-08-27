import {MomentDTO} from "./momentDTO";

export class SectionDTO {

  constructor(
    public id: string,
    public section_name: string,
    public moments: MomentDTO[],
  ) {
  }
}

export class CreateSectionDTO {

  constructor(
    public section_name: string,
    public worship_id: string,
  ) {
  }
}
