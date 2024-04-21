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
    private historyService: HistoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.route.data.subscribe(
      (data: { worship: WorshipDTO}) => {
        this.worshipProgram = data.worship
        this.originalName = this.worshipProgram.name

        let al1: Album = {id: 1, name: "linda playlist", image: "assest/church-player-2.png"}
        let al2: Album = {id: 1, name: "linda  maravilhosa", image: "assest/church-player-2.png"}
        let al3: Album = {id: 1, name: "linda d+", image: "assest/church-player-2.png"}

        let song: SongDTO = {id: 1, name: "cancao", file: "", times_played: 1, number: "1", albumId: 1, album: al1}
        let song2: SongDTO = {id: 2, name: "cancao2", file: "", times_played: 1, number: "2", albumId: 1, album: al2}
        let song3: SongDTO = {id: 3, name: "cancao3", file: "", times_played: 1, number: "3", albumId: 1, album: al3}
        let song4: SongDTO = {id: 4, name: "cancao4", file: "", times_played: 1, number: "4", albumId: 1, album: al1}
        let song5: SongDTO = {id: 5, name: "cancao5", file: "", times_played: 1, number: "5", albumId: 1, album: al3}

        let m1: MomentDTO = {id: 1, label: "primeiro hino", subgroup: 1, song_Id: 1, worshipId:this.worshipProgram.id, song: song}
        let m2: MomentDTO = {id: 2, label: "escola sabatina", subgroup: 1, song_Id: 1, worshipId:this.worshipProgram.id, song: song2}
        let m3: MomentDTO = {id: 3, label: "culto", subgroup: 2, song_Id: 1, worshipId:this.worshipProgram.id, song: song3}
        let m4: MomentDTO = {id: 4, label: "mensagem esoecial", subgroup: 2, song_Id: 1, worshipId:this.worshipProgram.id, song: null}
        let m5: MomentDTO = {id: 5, label: "fim", subgroup: 3, song_Id: 1, worshipId:this.worshipProgram.id, song: song5}

        let ml1: MomentDTO[] = []
        let ml2: MomentDTO[] = []
        let ml3: MomentDTO[] = []
        let ml4: MomentDTO[] = []
        let ml5: MomentDTO[] = []
        let ml6: MomentDTO[] = []
        let ml7: MomentDTO[] = []
        ml1.push(m1)
        ml1.push(m1)
        ml1.push(m1)
        ml2.push(m2)
        ml2.push(m5)
        ml2.push(m2)
        ml2.push(m3)
        ml3.push(m2)
        ml3.push(m2)
        ml3.push(m2)
        ml4.push(m3)
        ml5.push(m3)
        ml5.push(m3)
        ml6.push(m4)
        ml6.push(m4)
        ml6.push(m4)
        ml7.push(m5)
        ml7.push(m5)

        let s1: SubgroupDTO = {id: 1, label: "inicio culto", moments: ml1}
        let s2: SubgroupDTO = {id: 2, label: "parte do meio", moments: ml2}
        let s3: SubgroupDTO = {id: 3, label: "fim do culto", moments: ml3}
        let s4: SubgroupDTO = {id: 3, label: "fim do culto", moments: ml4}
        let s5: SubgroupDTO = {id: 3, label: "fim do culto", moments: ml5}
        let s6: SubgroupDTO = {id: 3, label: "fim do culto", moments: ml6}
        let s7: SubgroupDTO = {id: 3, label: "fim do culto", moments: ml7}

        let sl: SubgroupDTO[] = []
        sl.push(s1)
        sl.push(s2)
        sl.push(s3)
        sl.push(s4)
        sl.push(s5)
        sl.push(s6)
        sl.push(s7)

        this.worshipProgram.subgroup = sl
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
