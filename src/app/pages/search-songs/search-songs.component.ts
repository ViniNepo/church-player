import {Component, OnInit} from '@angular/core';
import {Music} from "../../model/music";
import {HistoryService} from "../../service/history.service";

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit{

  musics: Music[] = [
    {name: "corajosos", id: 1, number: 2, file: "3.jpg", timesPlayed: 1, duration: 2},
    {name: "fortes", id: 1, number: 2, file: "ja.jpeg", timesPlayed: 1, duration: 2},
    {name: "vencedores", id: 1, number: 2, file: "nature.jpg", timesPlayed: 1, duration: 2}
  ]

  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
  }

  playSong(id: number) {
    this.historyService.sendMusicToHistory(id)
  }
}
