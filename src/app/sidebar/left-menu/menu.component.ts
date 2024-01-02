import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../service/history.service";
import {DBService} from "../../service/db.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {delay, Observable, Subscription} from "rxjs";
import {HistoryDTO} from "../../model/dto/historyDTO";
import {Song} from "../../model/song";
import {SongDTO} from "../../model/dto/songDTO";

@Component({
  selector: 'app-left-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  history$: Observable<HistoryDTO[]>;
  file: Array<File>;
  showAlbumModal = false;
  showWorshipModal = false;
  form: FormGroup;
  subscription: Subscription

  constructor(
    private historyService: HistoryService,
    private dbService: DBService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.history$ = this.dbService.getHistoryDesc()

    this.subscription = this.historyService.historyEmitter.subscribe(history => {
      this.history$ = history
    })

    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      image: [null, Validators.required],
    })
  }

  onChange(event) {
    this.file = event.target.files
    this.form.controls['image'].setValue(this.file[0].name)
  }

  addAlbum(): void {
    this.dbService.uploadImage(this.file)
    this.dbService.getAlbums().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      this.form.controls['id'].setValue(id + 1);
      this.dbService.postAlbum(this.form.value).subscribe(data => {
        this.toggleAlbumModal()
        this.router.navigate(['/album', data.id])
      })
    })
  }

  addWorship(): void {
    this.dbService.uploadImage(this.file)
    this.dbService.getWorship().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      this.form.controls['id'].setValue(id + 1);

      this.dbService.postWorship(this.form.value).subscribe(data => {
        this.toggleWorshipModal()
        this.router.navigate(['/worship', data.id])
      })
    })
  }

  onAlbumCancel(): void {
    this.toggleAlbumModal()
  }

  onWorshipCancel(): void {
    this.toggleWorshipModal()
  }

  toggleAlbumModal() {
    this.form.reset()
    this.showAlbumModal = !this.showAlbumModal;
  }

  toggleWorshipModal() {
    this.form.reset()
    this.showWorshipModal = !this.showWorshipModal;
  }

  playSong(song: Song) {
    let songDTO: SongDTO
    this.dbService.openFile(song.file).subscribe()
    song.times_played = song.times_played + 1
    this.dbService.patchSongTime(song.id, song.times_played).subscribe(res => {
      songDTO = {id: res.id, name: res.name, file: res.file, number: res.number, times_played: res.times_played, albumId: res.albumId, album: null}
      this.historyService.sendMusicToHistory(songDTO)
    })
  }
}
