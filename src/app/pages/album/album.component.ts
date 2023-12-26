import {Component, OnInit} from '@angular/core';
import {Song} from "../../model/song";
import {HistoryService} from "../../service/history.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DBService} from "../../service/db.service";
import {AlbumDTO} from "../../model/dto/albumDTO";
import {FormBuilder, FormGroup} from "@angular/forms";
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
  album: AlbumDTO = null;
  form: FormGroup;

  constructor(
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private dbService: DBService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.dbService.getAlbumByID(this.id)
          .subscribe(data => {
            this.album = data
            this.originalName = this.album.name
          })
      })

    this.form = this.formBuilder.group({
      id: [null],
      name: [null],
      number: [null],
      times_played: [null],
      file: [null],
      albumId: [null]
    })
  }

  playSong(id: number) {
    //open
    this.historyService.sendMusicToHistory(id)
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
    this.dbService.putAlbumName(album).subscribe()
    this.originalName = this.album.name
    // this.historyService.sendMusicToHistory()
    this.editAlbumName()
  }


  cancelEditAlbumName() {
    this.album.name = this.originalName
    this.editAlbumName()
  }

  addSong() {
    this.dbService.getSongs().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      this.form.controls['id'].setValue(id + 1)
      this.form.controls['albumId'].setValue(this.album.id)
      this.form.controls['times_played'].setValue(0)

      this.dbService.postSong(this.form.value).subscribe(music => {
        let dto: SongDTO = {
          id: music.id,
          name: music.name,
          file: music.file,
          number: music.number,
          times_played: music.times_played,
          album: null
        }
        this.album.songs.push(dto)
      })
      this.toggleAddMusic()
    })
  }

  deleteSong(id: number, index: number) {
    this.dbService.deleteSong(id).subscribe()
    this.dbService.getHistory().subscribe(list => {
      list.forEach(next => {
        if (id === next.id) {
          this.dbService.deleteHistoryByID(id).subscribe()
        }
      })
    })
    this.album.songs.splice(index, 1);
  }

  deleteAlbum() {
    this.dbService.getHistory().subscribe(list => {
      for (let i = 0; i < list.length; i++) {
        if (this.album.songs[i].id === list[i].id) {
          this.dbService.deleteHistoryByID(list[i].id).subscribe()
        }
      }
    })
    this.album.songs.forEach(song => {
      this.dbService.deleteSong(song.id).subscribe()
    })
    this.dbService.deleteAlbum(this.album.id).subscribe()
    this.toggleDeleteAlbum()
    this.router.navigate(['/home'])
  }
}
