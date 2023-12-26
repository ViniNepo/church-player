import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../service/history.service";
import {DBService} from "../../service/db.service";
import {SongDTO} from "../../model/dto/songDTO";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit{

  musics: SongDTO[] = []
  // filteredMusics: SongDTO = []
  query = ''

  constructor(private historyService: HistoryService, private dbService: DBService) {
  }

  ngOnInit() {
    this.dbService.getSearchSongs()
      .subscribe(data =>{
        this.musics = data
      })

    // this.result$ = this.query.valueChanges
    //   .pipe(tap(value => console.log(value)))
  }

  playSong(id: number) {
    this.historyService.sendMusicToHistory(id)
  }

  searchSong(x) {
    if (x.target.value == '') {
      this.dbService.getSearchSongs().subscribe(songs => {
        this.musics = songs
      })
    } else {
      this.dbService.getSearchSongsByQuery(x.target.value).subscribe(songs => {
        this.musics = songs
      })
    }
  }
}
