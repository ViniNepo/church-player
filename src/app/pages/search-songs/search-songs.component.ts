import {Component, OnInit} from '@angular/core';
import {Music} from "../../model/music";
import {HistoryService} from "../../service/history.service";
import {DBService} from "../../service/db.service";
import {SongDTO} from "../../model/dto/songDTO";

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit{

  musics: SongDTO[] = []

  constructor(private historyService: HistoryService, private dbService: DBService) {
  }

  ngOnInit() {
    this.dbService.getSearchSongs()
      .subscribe(data =>{
        this.musics = data
      })
  }

  playSong(id: number) {
    this.historyService.sendMusicToHistory(id)
  }
}
