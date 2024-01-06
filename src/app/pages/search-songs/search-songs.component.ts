import {Component, OnDestroy, OnInit} from '@angular/core';
import {HistoryService} from "../../service/history.service";
import {DBService} from "../../service/db.service";
import {SongDTO} from "../../model/dto/songDTO";
import {FormControl} from "@angular/forms";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {

  musics$: Observable<SongDTO[]>

  constructor(private historyService: HistoryService, private dbService: DBService) {
  }

  ngOnInit() {
    this.musics$ = this.dbService.getSearchSongs()
  }

  playSong(song: SongDTO) {
    this.dbService.openFile(song.file).subscribe()
    song.times_played = song.times_played + 1
    this.dbService.patchSongTime(song.id, song.times_played).subscribe(response => {
      this.musics$.subscribe(musics => {
        musics.forEach(music => {
          if (music.id == response.id) {
            music.times_played = response.times_played
          }
        })
      })
    })
    this.historyService.sendMusicToHistory(song)
  }

  searchSong(x) {
    if (x.target.value == '') {
      this.musics$ = this.dbService.getSearchSongs()
    } else {
      this.musics$ = this.dbService.getSearchSongsByQuery(x.target.value)
    }
  }
}
