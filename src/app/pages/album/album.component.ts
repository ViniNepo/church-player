import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../service/history.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DBService} from "../../service/db.service";
import {AlbumDTO} from "../../model/dto/albumDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongDTO} from "../../model/dto/songDTO";
import {Album} from "../../model/album";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {

  id: number;
  editName = false;
  showDeleteModal = false
  showAddSongModal = false
  originalName: string;
  album: AlbumDTO;
  form: FormGroup;
  file: Array<File>

  constructor(
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private dbService: DBService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { album: AlbumDTO }) => {
        this.album = data.album
        this.originalName = this.album.name
      }
    )

    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      number: [null],
      times_played: [null],
      file: [null, Validators.required],
      albumId: [null],
    })
  }

  playSong(song: SongDTO) {
    this.dbService.openFile(song.file).subscribe()
    song.times_played = song.times_played + 1
    this.dbService.patchSongTime(song.id, song.times_played).subscribe(response => {
      this.album.songs.forEach(x => {
        if (x.id == response.id) {
          x.times_played = response.times_played
        }
      })
    })

    this.historyService.sendMusicToHistory(song)
  }

  toggleAddMusic() {
    this.form.reset()
    this.showAddSongModal = !this.showAddSongModal
  }

  toggleDeleteAlbum() {
    this.showDeleteModal = !this.showDeleteModal
  }

  editAlbumName() {
    this.editName = !this.editName
  }

  saveAlbumName() {
    let album: Album = {id: this.album.id, name: this.album.name, image: this.album.image}
    this.dbService.putAlbumName(album).subscribe(a => {
      this.originalName = this.album.name
      this.historyService.updateHistory()
    })
    this.editAlbumName()
  }


  cancelEditAlbumName() {
    this.album.name = this.originalName
    this.editAlbumName()
  }

  onChange(event) {
    this.file = event.target.files
    this.form.controls['file'].setValue(this.file[0].name)
  }

  addSong() {
    this.dbService.uploadFile(this.file)
    this.dbService.getSongs().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      this.form.controls['id'].setValue(id + 1)
      this.form.controls['albumId'].setValue(this.album.id)
      this.form.controls['times_played'].setValue(0)
      if (this.form.get('number').value == null) {
        this.form.controls['number'].setValue('-')
      }

      this.dbService.postSong(this.form.value).subscribe(music => {
        let dto: SongDTO = {
          id: music.id,
          name: music.name,
          file: music.file,
          number: music.number,
          times_played: music.times_played,
          albumId: music.albumId,
          album: null
        }
        this.album.songs.push(dto)
      })
      this.toggleAddMusic()
    })
  }

  deleteSong(id: number, index: number) {
    this.dbService.deleteSongBtID(id).subscribe(() => {
      this.dbService.getHistory().subscribe(history => {
        history.forEach(h => {
          if (id == h.songId) {
            this.dbService.deleteHistoryByID(h.id).subscribe()
          }
        })
        this.historyService.updateHistory()
      })
    })
    this.album.songs.splice(index, 1);
  }

  deleteAlbum() {
    this.dbService.getHistory().subscribe(history => {
      history.forEach(h => {
        this.album.songs.forEach(s => {
          if (h.songId == s.id) {
            this.dbService.deleteHistoryByID(h.id).subscribe(() => {
              this.historyService.updateHistory()
            })
            this.dbService.deleteSongBtID(s.id).subscribe()
          }
        })
      })
      this.dbService.deleteAlbum(this.album.id).subscribe()
    })
    this.toggleDeleteAlbum()
    this.router.navigate(['/home'])
  }
}
