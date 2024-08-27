import {Component, OnInit} from '@angular/core';
import {DBService} from "../../service/db.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorshipDTO} from "../../model/dto/worship-programDTO";
import {FormGroup} from "@angular/forms";
import {CreateMomentDTO, MomentDTO} from "../../model/dto/momentDTO";
import {SongDTO, SongWithAlbumDTO} from "../../model/dto/songDTO";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Worship} from "../../model/worship";
import {Song} from "../../model/song";
import {Moment} from "../../model/moment";
import {CreateSectionDTO} from "../../model/dto/sectionDTO";

@Component({
  selector: 'app-worship-program',
  templateUrl: './worship-program.component.html',
  styleUrls: ['./worship-program.component.scss']
})
export class WorshipProgramComponent implements OnInit {

  id: number;
  showDeleteModal = false
  showAddMomentModal = false
  showAddSectionModal = false
  showUpdateLabelModal = false
  showDeleteMoment = false
  showDeleteSection = false
  showOptions = false
  showEditCover = false
  editName = false
  editMomentIndex: number | null = null;
  originalName: string;
  originalMomentName: string
  sectionID: string | null = null;
  momentID: string | null = null;
  newSectionName: string | null = null;
  newMomentName: string | null = null;
  worshipImage: string | null = null
  worship: WorshipDTO
  songs: SongDTO[]
  momentSelected: MomentDTO
  selectedCover: Array<File>

  constructor(
    private dbService: DBService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe(
      (data: { worship: WorshipDTO }) => {
        this.worship = data.worship
        this.worship.sections = this.worship.sections || []
        this.worshipImage = this.worship.image_url
        this.originalName = this.worship.title
        console.log(this.worship)
      }
    )
  }

  ngOnInit() {
  }

  playSong(song: SongWithAlbumDTO): void {
  }

  toggleDeleteWorship() {
    this.showDeleteModal = !this.showDeleteModal
  }

  toggleDeleteMoment(id: string) {
    this.momentID = id
    this.showDeleteMoment = !this.showDeleteMoment
  }

  toggleDeleteSection(id: string) {
    this.sectionID = id
    this.showDeleteSection = !this.showDeleteSection
  }

  toggleAddMoment(id: string) {
    this.sectionID = id
    this.showAddMomentModal = !this.showAddMomentModal
  }

  toggleAddSection() {
    this.showAddSectionModal = !this.showAddSectionModal
  }

  toggleShowOption(moment: MomentDTO) {
    this.momentSelected = moment
    this.showOptions = !this.showOptions
  }

  toggleEditCover() {
    this.showEditCover = !this.showEditCover
  }

  toggleUpdateLabelName(index: number, moment: MomentDTO) {
    this.originalMomentName = moment.title
    this.showUpdateLabelModal = !this.showUpdateLabelModal
    this.editMomentIndex = index;
  }

  cancelEditMomentDetails(moment: MomentDTO) {
    moment.title = this.originalMomentName
    this.editMomentIndex = null;
  }

  updateMomentDetails(momentDTO: MomentDTO, sectionID: string) {
    const moment = new Moment(momentDTO.id, momentDTO.title, momentDTO.song_order, momentDTO.song.id, sectionID)
    this.dbService.updateMoment(moment).subscribe({
      next: () => {
        console.log('Moment updated:');
      },
      error: (error) => {
        momentDTO.title = this.originalMomentName
        alert("deu ruim")
        console.error('Error updating selected moment:', error);
      }
    });
    this.editMomentIndex = null;
  }

  onChangeCover(event) {
    this.selectedCover = event.target.files
  }

  editWorshipCover() {
    this.worship.image_url = this.selectedCover[0].name
    let worship: Worship = new Worship(this.worship.id, this.worship.title, this.worship.image_url)

    this.dbService.updateWorship(worship).subscribe({
      next: () => {
        this.worshipImage = this.worship.image_url
        console.log('Worship updated:');
      },
      error: (error) => {
        this.worship.title = this.originalName
        console.error('Error updating worship cover:', error);
      }
    });
    this.toggleEditCover()
  }

  createMoment() {
    let dto: CreateMomentDTO = new CreateMomentDTO(this.newMomentName, this.sectionID)
    this.dbService.createMoment(dto).subscribe({
      next: () => {
        this.dbService.getWorshipByID(this.worship.id).subscribe({
          next: (worshipDTO: WorshipDTO) => {
            this.worship.sections = worshipDTO.sections
          },
          error: (error) => {
            this.worship.title = this.originalName
            console.error('Error updating worship cover:', error);
          }
        });

        this.newMomentName = null
        this.sectionID = null
        this.toggleAddMoment(null)
        console.log('Moment created:');
      },
      error: (error) => {
        this.newMomentName = null
        this.sectionID = null
        this.toggleAddMoment(null)
        console.error('Error creating new moment:', error);
      }
    });
  }

  createSection() {
    console.log(this.newSectionName)
    let dto: CreateSectionDTO = new CreateSectionDTO(this.newSectionName, this.worship.id)
    this.dbService.createSection(dto).subscribe({
      next: () => {
        this.dbService.getWorshipByID(this.worship.id).subscribe({
          next: (worshipDTO: WorshipDTO) => {
            this.worship.sections = worshipDTO.sections
          },
          error: (error) => {
            this.worship.title = this.originalName
            console.error('Error updating worship cover:', error);
          }
        });

        this.newSectionName = null
        this.toggleAddSection()
        console.log('Moment created:');
      },
      error: (error) => {
        this.newSectionName = null
        this.toggleAddSection()
        console.error('Error creating new moment:', error);
      }
    });
  }

  deleteWorship() {
    this.dbService.deleteWorship(this.worship.id).subscribe({
      next: () => {
        this.toggleDeleteWorship()
        this.router.navigate(['/home'])
      },
      error: (error) => {
        this.toggleDeleteWorship()
        console.error('Error deleting album:', error);
      }
    });
  }

  deleteMoment() {
    this.dbService.deleteMoment(this.momentID).subscribe({
      next: () => {
        this.dbService.getWorshipByID(this.worship.id).subscribe({
          next: (worshipDTO: WorshipDTO) => {
            this.worship.sections = worshipDTO.sections
          },
          error: (error) => {
            this.worship.title = this.originalName
            console.error('Error getting moments:', error);
          }
        });

        this.toggleDeleteMoment(null)
        console.log('Moment deleted:');
      },
      error: (error) => {
        this.toggleDeleteMoment(null)
        console.error('Error deleting moment:', error);
      }
    });
  }

  deleteSection() {
    this.dbService.deleteSection(this.sectionID).subscribe({
      next: () => {
        this.dbService.getWorshipByID(this.worship.id).subscribe({
          next: (worshipDTO: WorshipDTO) => {
            this.worship.sections = worshipDTO.sections
          },
          error: (error) => {
            this.worship.title = this.originalName
            console.error('Error getting sections:', error);
          }
        });

        this.toggleDeleteSection(null)
        console.log('Moment deleted:');
      },
      error: (error) => {
        this.toggleDeleteSection(null)
        console.error('Error deleting section:', error);
      }
    });
  }

  editWorshipName() {
    this.editName = !this.editName
  }

  updateWorshipTitle() {
    let worship: Worship = new Worship(this.worship.id, this.worship.title, this.worship.image_url)
    this.dbService.updateWorship(worship).subscribe({
      next: () => {
        console.log('Worship updated:');
      },
      error: (error) => {
        this.worship.title = this.originalName
        console.error('Error updating worship:', error);
      }
    });
    this.editWorshipName()
  }

  cancelEditAlbumName() {
    this.worship.title = this.originalName
    this.editWorshipName()
  }

  selectOption(song: SongDTO) {
    this.toggleShowOption(null)
  }

  searchSong(x) {

  }

  drop(event: CdkDragDrop<MomentDTO[]>) {
    console.log(this.worship.sections)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
