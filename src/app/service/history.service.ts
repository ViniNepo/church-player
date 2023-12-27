import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {DBService} from "./db.service";
import {SongDTO} from "../model/dto/songDTO";
import {HistoryDTO, IdDTO} from "../model/dto/historyDTO";
import {delay, Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historyEmitter = new EventEmitter<Observable<HistoryDTO[]>>();

  constructor(private dbService: DBService) {
  }

  async sendMusicToHistory(song: SongDTO) {
    await this.dbService.getSongByID(song.id).subscribe(music => {
      this.dbService.getHistory().subscribe(histories => {
        if (histories.length > 19) {
          this.dbService.deleteHistoryByID(histories.shift().id).subscribe()
        }

        histories.forEach(h => {
          if (music.id == h.songId) {
            this.dbService.deleteHistoryByID(h.id).subscribe()
          }
        })

        let id = 0
        if (histories.length > 0) {
          id = histories.pop().id
        }

        let dto = {id: id + 1, songId: song.id, albumId: song.albumId}
        this.dbService.postHistory(dto).subscribe(() => {
          this.historyEmitter.emit(this.dbService.getHistoryDesc())
        })
      })
    })
  }

  updateHistory() {
    this.historyEmitter.emit(this.dbService.getHistoryDesc())
  }

}
