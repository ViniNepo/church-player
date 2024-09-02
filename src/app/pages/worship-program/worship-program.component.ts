import {Component, OnInit} from '@angular/core';
import {DBService} from "../../service/db.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorshipDTO} from "../../model/dto/worship-programDTO";
import {CreateMomentDTO, MomentDTO, MomentOrderDTO} from "../../model/dto/momentDTO";
import {SongWithAlbumDTO} from "../../model/dto/songDTO";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Worship} from "../../model/worship";
import {Moment} from "../../model/moment";
import {CreateSectionDTO, SectionDTO} from "../../model/dto/sectionDTO";
import {Section} from "../../model/section";

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
  editSection = false
  editMomentIndex: number | null = null;
  originalName: string | null = null;
  originalSection: string | null = null;
  originalMomentName: string | null = null;
  sectionID: string | null = null;
  momentID: string | null = null;
  newSectionName: string | null = null;
  newMomentName: string | null = null;
  worship: WorshipDTO
  songs: SongWithAlbumDTO[]
  filteredSongs: SongWithAlbumDTO[] = [];
  searchTerm: string = '';
  sectionIndex: number
  momentIndex: number
  selectedCover: Array<File>
  connectedTo: string[][] = [];
  editSectionIndex: number | null = null;

  constructor(
    private dbService: DBService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe(
      (data: { worship: WorshipDTO }) => {
        this.worship = data.worship
        this.worship.sections = this.worship.sections || []
        for (const section of this.worship.sections) {
          section.moments = section.moments || []
        }
        this.originalName = this.worship.title
      }
    )
  }

  ngOnInit(): void {
    this.extracted();

    this.dbService.findAll().subscribe({
      next: (songDTO: SongWithAlbumDTO[]) => {
        this.songs = songDTO || [];
        this.filteredSongs = this.songs;
      },
      error: (error) => {
        console.error('Error getting songs:', error);
      }
    });
  }

  extracted() {
    this.connectedTo = this.worship.sections.map((_, i) =>
      this.worship.sections.map((_, j) => i !== j ? 'session-' + j : '')
        .filter(id => id !== '')
    );
  }

  playSong(song: SongWithAlbumDTO): void {
    this.dbService.playSong(song.file).subscribe({
      next: () => {
        console.log('song playing')
      },
      error: (error) => {
        console.error('Error getting songs:', error);
      }
    });
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
    this.newMomentName = null
    this.showAddMomentModal = !this.showAddMomentModal
  }

  toggleAddSection() {
    this.newSectionName = null
    this.showAddSectionModal = !this.showAddSectionModal
  }

  toggleShowOption(sectionIndex: number, momentIndex: number) {
    this.sectionIndex = sectionIndex
    this.momentIndex = momentIndex
    this.showOptions = !this.showOptions
  }

  toggleEditCover() {
    this.selectedCover = []
    this.showEditCover = !this.showEditCover
  }

  editMomentIndices: { sectionIndex: number, momentIndex: number } | null = null;

  toggleUpdateLabelName(sectionIndex: number, momentIndex: number, moment: MomentDTO) {
    this.originalMomentName = moment.title;
    this.showUpdateLabelModal = !this.showUpdateLabelModal;
    this.editMomentIndices = { sectionIndex, momentIndex };
  }

  cancelEditMomentDetails(moment: MomentDTO) {
    moment.title = this.originalMomentName;
    this.editMomentIndices = null;
  }

  updateMomentDetails(momentDTO: MomentDTO, sectionID: string) {
    let songID: string =  ""
    if (momentDTO.song != null) {
      songID = momentDTO.song.id
    }

    const moment = new Moment(momentDTO.id, momentDTO.title, momentDTO.song_order, songID, sectionID);
    this.dbService.updateMoment(moment).subscribe({
      next: () => {
        console.log('Moment updated:');
      },
      error: (error) => {
        momentDTO.title = this.originalMomentName;
        alert("deu ruim");
        console.error('Error updating selected moment:', error);
      }
    });
    this.originalMomentName = "";
    this.showUpdateLabelModal = !this.showUpdateLabelModal;
    this.editMomentIndices = null;
  }

  onChangeCover(event) {
    this.selectedCover = event.target.files
  }

  editWorshipCover() {
    const formData = new FormData();
    let worship: Worship = new Worship(this.worship.id, this.worship.title, this.worship.image_url)
    formData.append('worship', JSON.stringify(worship));

    if (this.selectedCover[0]) {
      formData.append('files', this.selectedCover[0]);
    }

    this.dbService.updateWorship(formData).subscribe({
      next: () => {
        this.worship.image_url = this.selectedCover[0].name
        this.toggleEditCover()
        console.log('Worship updated:');
      },
      error: (error) => {
        this.toggleEditCover()
        console.error('Error updating worship cover:', error);
      }
    });
  }

  createMoment() {
    let dto: CreateMomentDTO = new CreateMomentDTO(this.newMomentName, this.sectionID)
    this.dbService.createMoment(dto).subscribe({
      next: () => {
        this.dbService.getWorshipByID(this.worship.id).subscribe({
          next: (worshipDTO: WorshipDTO) => {
            this.worship.sections = worshipDTO.sections
            this.worship.sections = this.worship.sections || []
            for (const section of this.worship.sections) {
              section.moments = section.moments || []
            }
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
    let dto: CreateSectionDTO = new CreateSectionDTO(this.newSectionName, this.worship.id)
    this.dbService.createSection(dto).subscribe({
      next: () => {
        this.dbService.getWorshipByID(this.worship.id).subscribe({
          next: (worshipDTO: WorshipDTO) => {
            this.worship.sections = worshipDTO.sections
            this.worship.sections = this.worship.sections || []
            for (const section of this.worship.sections) {
              section.moments = section.moments || []
            }
            this.extracted()
          },
          error: (error) => {
            this.worship.title = this.originalName
            console.error('Error updating worship cover:', error);
          }
        });

        this.toggleAddSection()
        console.log('Section created:');
      },
      error: (error) => {
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
            this.worship.sections = this.worship.sections || []
            for (const section of this.worship.sections) {
              section.moments = section.moments || []
            }
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
            this.worship.sections = this.worship.sections || []
            for (const section of this.worship.sections) {
              section.moments = section.moments || []
            }
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

  editSectionName(sectionName: string, index: number) {
    this.originalSection = sectionName
    this.editSectionIndex = index;
  }

  updateWorshipTitle() {
    const formData = new FormData();
    let worship: Worship = new Worship(this.worship.id, this.worship.title, this.worship.image_url)
    formData.append('worship', JSON.stringify(worship));

    this.dbService.updateWorship(formData).subscribe({
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

  updateSectionTitle(section: SectionDTO, index: number) {
    let s: Section = new Section(section.id, section.section_name, 0, this.worship.id)
    this.dbService.updateSection(s).subscribe({
      next: () => {
        this.editSectionName(null, null)
        console.log('Worship updated:');
      },
      error: (error) => {
        this.worship.sections[index].section_name = this.originalSection
        this.editSectionName(null, null)
        console.error('Error updating worship:', error);
      }
    });
  }

  cancelEditAlbumName() {
    this.worship.title = this.originalName
    this.editWorshipName()
  }

  cancelEditSectionName(index: number) {
    this.worship.sections[index].section_name = this.originalSection
    this.editSectionName(null, null)
  }

  selectOption(song: SongWithAlbumDTO) {
    console.log(song)
    this.worship.sections[this.sectionIndex].moments[this.momentIndex].song = song

    let moment: MomentDTO = new MomentDTO(
      this.worship.sections[this.sectionIndex].moments[this.momentIndex].id,
      this.worship.sections[this.sectionIndex].moments[this.momentIndex].title,
      this.worship.sections[this.sectionIndex].moments[this.momentIndex].song_order,
      this.worship.sections[this.sectionIndex].id, song)

    this.updateMomentDetails(moment, this.worship.sections[this.sectionIndex].id)

    this.toggleShowOption(null, null)
  }

  deleteSongMoment(sectionIndex: number, momentIndex: number) {
    this.worship.sections[sectionIndex].moments[momentIndex].song = null

    let moment: Moment = new Moment(
      this.worship.sections[sectionIndex].moments[momentIndex].id,
      this.worship.sections[sectionIndex].moments[momentIndex].title,
      this.worship.sections[sectionIndex].moments[momentIndex].song_order,
      "",
      this.worship.sections[sectionIndex].id)

    this.dbService.updateMoment(moment).subscribe({
      next: () => {
        console.log('Moment song updated:');
      },
      error: (error) => {
        alert("deu ruim")
        console.error('Error updating selected moment:', error);
      }
    });
  }

  searchSong(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();

    // Se searchTerm estiver vazio, exibe todas as músicas, caso contrário, aplica o filtro
    this.filteredSongs = this.searchTerm ?
      this.songs.filter(song => song.title.toLowerCase().includes(this.searchTerm)) :
      this.songs;
  }

  drop(event
         :
         CdkDragDrop<MomentDTO[]>, sessionIndex
         :
         number
  ) {
    // Verifica se o item foi movido dentro da mesma lista ou para outra lista
    if (event.previousContainer === event.container) {
      // Reordena dentro da mesma sessão
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transfere o item para uma nova sessão
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    let momentsOrders: MomentOrderDTO[] = []

    for (const section of this.worship.sections) {
      let index: number = 0
      for (const moment of section.moments) {
        let momentOrder: MomentOrderDTO = new MomentOrderDTO(moment.id, index, section.id)
        index++
        momentsOrders.push(momentOrder)
      }
    }

    this.dbService.updateMomentsOrder(momentsOrders).subscribe({
      next: () => {
        console.log('Moments order updated:');
      },
      error: (error) => {
        console.error('Error updating moments order:', error);
      }
    });
  }
}
