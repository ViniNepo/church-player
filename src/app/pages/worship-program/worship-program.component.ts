import {Component, OnInit} from '@angular/core';
import {DBService} from "../../service/db.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorshipDTO} from "../../model/dto/worship-programDTO";
import {HistoryService} from "../../service/history.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MomentDTO} from "../../model/dto/momentDTO";
import {Worship} from "../../model/worship";
import {SongDTO} from "../../model/dto/songDTO";
import {Moment} from "../../model/moment";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

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
  filteredData: SongDTO[]
  form: FormGroup;

  constructor(
    private dbService: DBService,
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.route.data.subscribe(
      (data: { worship: WorshipDTO, songs: SongDTO[] }) => {
        this.worshipProgram = data.worship
        this.originalName = this.worshipProgram.name

        console.log(this.worshipProgram)
        console.log(this.songs)
        // this.worshipProgram.subgroup.forEach(moment => {
          // if (moment.song_Id != null) {
          //   this.dbService.getSongByMomentID(moment.song_Id).subscribe(song => {
          //     moment.song = song
          //   })
          // }
        // })

        this.songs = data.songs
        this.filteredData = [...this.songs];
      }
    )
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null],
      label: [null, Validators.required],
      songId: [null],
      worshipId: [null],
    })
  }

  playSong(song: SongDTO): void {
    this.dbService.openFile(song.file).subscribe()
    song.times_played = song.times_played + 1
    // this.dbService.patchSongTime(song.id, song.times_played).subscribe(response => {
    //   this.worshipProgram.moments.forEach(moment => {
    //     if (moment.song_Id == response.id) {
    //       moment.song.times_played = response.times_played
    //     }
    //   })
    // })

    this.historyService.sendMusicToHistory(song)
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
    this.dbService.putMoment(this.labelSelected).subscribe()
    this.toggleUpdateLabelName(null)
  }

  addLabel() {
    this.dbService.getMoments().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      this.form.controls['id'].setValue(id + 1);
      this.form.controls['worshipId'].setValue(this.worshipProgram.id)
      const name = this.form.get('label').value
      const str2 = name.charAt(0).toUpperCase() + name.slice(1);
      this.form.controls['label'].setValue(str2);
      // this.dbService.postMoment(this.form.value).subscribe(moment => {
      //   let dto: MomentDTO = {
      //     id: moment.id,
      //     label: moment.label,
      //     subgroup: moment.subgroup,
      //     song_Id: moment.song_Id,
      //     worshipId: moment.worshipId,
      //     song: null,
      //   }
      //   this.worshipProgram.moments.push(dto)
      //   this.form.reset()
      //   this.toggleAddLabel()
      // })
    })
  }

  deleteWorship() {
    // this.worshipProgram.moments.forEach(moment => {
    //   this.dbService.deleteMomentByID(moment.id).subscribe()
    // })
    this.dbService.deleteWorshipByID(this.worshipProgram.id).subscribe(() => {
      this.dbService.deleteFile(this.worshipProgram.image, 'images').subscribe()
    })
    this.toggleDeleteWorship()
    this.router.navigate(['/home'])
  }

  deleteLabel(id: number, index: number) {
    this.dbService.deleteMomentByID(id).subscribe()
    // this.worshipProgram.moments.splice(index, 1);
  }

  editAlbumName() {
    this.editName = !this.editName
  }

  saveAlbumName() {
    let worship: Worship = {
      id: this.worshipProgram.id,
      name: this.worshipProgram.name,
      image: this.worshipProgram.image
    }
    this.dbService.putWorshipName(worship).subscribe()
    this.originalName = this.worshipProgram.name
    this.editAlbumName()
  }

  cancelEditAlbumName() {
    this.worshipProgram.name = this.originalName
    this.editAlbumName()
  }

  selectOption(song: SongDTO) {
    // this.worshipProgram.moments.forEach(moment => {
    //   if (moment == this.momentSelected) {
    //     moment.song_Id = song.id
    //     moment.song = song
    //     let m: Moment = {id: moment.id, label: moment.label, song_Id: moment.song_Id, subgroup:moment.subgroup, worshipId: this.worshipProgram.id}
    //     this.dbService.putMoment(m).subscribe()
    //   }
    // })
    this.toggleShowOption(null)
  }

  searchSong(x) {
    if (x.target.value == '') {
      this.dbService.getSearchSongs().subscribe(song => {
        this.songs = song
      })
    } else {
      this.dbService.getSearchSongsByQuery(x.target.value).subscribe(song => {
        this.songs = song
      })
    }
  }

  drop(event: CdkDragDrop<MomentDTO[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

}
