import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../service/history.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DBService} from "../../service/db.service";
import {AlbumDTO} from "../../model/dto/albumDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongDTO} from "../../model/dto/songDTO";
import {Album} from "../../model/album";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Song} from "../../model/song";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {

  id: number;
  editName = false;
  showDeleteModal = false
  showDeleteSongModal = false
  showAddSongModal = false
  originalName: string;
  album: AlbumDTO;
  files: Array<File>

  constructor(
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private dbService: DBService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { album: AlbumDTO }) => {
        this.album = data.album
        this.originalName = this.album.name
      }
    )
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
    this.files = []
    this.showAddSongModal = !this.showAddSongModal
  }

  toggleDeleteAlbum() {
    this.showDeleteModal = !this.showDeleteModal
  }

  toggleDeleteSong() {
    this.showDeleteSongModal = !this.showDeleteSongModal
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
    this.files = event.target.files
    console.log(this.files)
  }

  addSong() {
    console.log(this.files)
    this.dbService.getSongs().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      const name = this.files[0].name
      const songName = name.charAt(0).toUpperCase() + name.slice(1);

      let song: Song = {id: 2, name: songName, number: "1", albumId: this.album.id, file: songName, times_played: 1}
      this.dbService.postSong(song).subscribe(music => {
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

  deleteSong(song: SongDTO, index: number) {
    this.dbService.getMoments().subscribe(moments => {
      if (moments.length > 0) {
        moments.forEach(moment => {
          if (moment.song_Id == song.id) {
            moment.song_Id = null
            this.dbService.putMoment(moment).subscribe(moment => {
              this.delete(song, index)
            })
          }
        })
      } else {
        this.delete(song, index)
      }
    })
  }

  delete(song: SongDTO, index: number) {
    this.dbService.deleteSongBtID(song.id).subscribe(() => {
      this.dbService.deleteFile(song.file, 'files').subscribe()
      this.dbService.getHistory().subscribe(history => {
        history.forEach(h => {
          if (song.id == h.songId) {
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
      history.forEach(history => {
        this.album.songs.forEach(song => {
          if (history.songId == song.id) {
            this.dbService.deleteHistoryByID(history.id).subscribe(() => {
              this.historyService.updateHistory()
            })
          }
        })
      })

      let count = this.album.songs.length
      console.log(count)
      if (this.album.songs.length > 0) {
        this.album.songs.forEach(song => {
          this.dbService.deleteFile(song.file, 'files').subscribe()
          this.dbService.getMoments().subscribe(moments => {
            moments.forEach(moment => {
              if (moment.song_Id == song.id) {
                moment.song_Id = null
                this.dbService.putMoment(moment).subscribe()
              }
            })
          })

          count--
        })

        if (count == 0) {
          this.dbService.deleteAlbum(this.album.id).subscribe(() => {
            this.dbService.deleteFile(this.album.image, 'images').subscribe()
            this.toggleDeleteAlbum()
            this.router.navigate(['/home'])
          })
        }
      } else {
        this.dbService.deleteAlbum(this.album.id).subscribe(() => {
          this.dbService.deleteFile(this.album.image, 'images').subscribe()
          this.toggleDeleteAlbum()
          this.router.navigate(['/home'])
        })
      }
    })
  }
}
