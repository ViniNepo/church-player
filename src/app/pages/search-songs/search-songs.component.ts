import {Component, OnDestroy, OnInit} from '@angular/core';
import {DBService} from "../../service/db.service";
import {SongDTO} from "../../model/dto/songDTO";
import {Observable} from "rxjs";

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {

  musics$: Observable<SongDTO[]>

  constructor(private dbService: DBService) {
  }

  ngOnInit() {
    this.musics$ = this.dbService.getSearchSongs()
  }

  playSong(song: SongDTO) {
  }

  searchSong(x) {
  }
}
