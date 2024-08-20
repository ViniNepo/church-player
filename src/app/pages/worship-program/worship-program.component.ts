import {Component, OnInit} from '@angular/core';
import {DBService} from "../../service/db.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorshipDTO} from "../../model/dto/worship-programDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MomentDTO} from "../../model/dto/momentDTO";
import {Worship} from "../../model/worship";
import {SongDTO} from "../../model/dto/songDTO";
import {Moment} from "../../model/moment";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SubgroupDTO} from "../../model/dto/subgroupDTO";
import {Album} from "../../model/album";

@Component({
  selector: 'app-worship-program',
  templateUrl: './worship-program.component.html',
  styleUrls: ['./worship-program.component.scss']
})
export class WorshipProgramComponent implements OnInit {

  id: number;
  showDeleteModal = false
  showAddLabelModal = false
  showUpdateLabelModal = false
  showOptions = false
  editName = false
  originalName: string;
  worshipProgram: WorshipDTO
  songs: SongDTO[]
  momentSelected: MomentDTO
  labelSelected: MomentDTO
  form: FormGroup;

  constructor(
    private dbService: DBService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe(
      (data: { worship: WorshipDTO }) => {
        this.worshipProgram = data.worship
        this.worshipProgram.subgroup = data.worship.subgroup
        this.originalName = this.worshipProgram.name

        // this.worshipProgram.subgroup = sl
        console.log(this.worshipProgram)
        // this.worshipProgram.subgroup.forEach(moment => {
        //   if (moment.song_Id != null) {
        //     this.dbService.getSongByMomentID(moment.song_Id).subscribe(song => {
        //       moment.song = song
        //     })
        //   }
        // })
      }
    )
    console.log('worship')
    console.log(this.worshipProgram.subgroup)
  }

  ngOnInit() {
  }

  playSong(song: SongDTO): void {
    // this.dbService.openFile(song.file).subscribe()
  }

  toggleDeleteWorship() {
    this.showDeleteModal = !this.showDeleteModal
  }

  toggleAddLabel() {
    this.showAddLabelModal = !this.showAddLabelModal
  }

  toggleShowOption(moment: MomentDTO) {
    this.momentSelected = moment
    this.showOptions = !this.showOptions
  }

  toggleUpdateLabelName(moment: MomentDTO) {
    this.labelSelected = moment
    this.showUpdateLabelModal = !this.showUpdateLabelModal
  }

  saveUpdateLabelName() {
    // this.dbService.putMoment(this.labelSelected).subscribe()
    this.toggleUpdateLabelName(null)
  }

  addLabel() {
  }

  deleteWorship() {
    this.router.navigate(['/home'])
  }

  deleteLabel(id: number, index: number) {
  }

  editAlbumName() {
    this.editName = !this.editName
  }

  saveAlbumName() {
    // let worship: Worship = {
    //   id: this.worshipProgram.id,
    //   name: this.worshipProgram.name,
    //   image: this.worshipProgram.image
    // }
    // this.dbService.putWorshipName(worship).subscribe()
    // this.originalName = this.worshipProgram.name
    // this.editAlbumName()
  }

  cancelEditAlbumName() {
    this.worshipProgram.name = this.originalName
    this.editAlbumName()
  }

  selectOption(song: SongDTO) {
    this.toggleShowOption(null)
  }

  searchSong(x) {
    // if (x.target.value == '') {
    //   this.dbService.getSearchSongs().subscribe(song => {
    //     this.songs = song
    //   })
    // } else {
    //   this.dbService.getSearchSongsByQuery(x.target.value).subscribe(song => {
    //     this.songs = song
    //   })
    // }
  }

  drop(event: CdkDragDrop<MomentDTO[]>) {
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
