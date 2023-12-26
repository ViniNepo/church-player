import {EventEmitter, Injectable} from '@angular/core';
import {DBService} from "./db.service";
import {SongDTO} from "../model/dto/songDTO";
import {IdDTO} from "../model/dto/id";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historyEmitter = new EventEmitter<SongDTO>();

  constructor(private dbService: DBService) {
  }

  sendMusicToHistory(id: number) {
    let history: IdDTO[];
    this.dbService.getHistory()
      .subscribe(data => {
        history = data;
        for (const h of history) {
          if (h.id === id) {
            this.dbService.deleteHistoryByID(h.id)
              .subscribe()
          }
        }
        this.dbService.postHistory(id)
          .subscribe(data => {
            this.dbService.getSongByID(data.id)
              .subscribe(data => {
                this.historyEmitter.emit(data);
              })
          })
      })
  }

  getHistory() {
    let history: IdDTO[];
    this.dbService.getHistory()
      .subscribe(data => {
        history = data

        for (const h of history) {
          this.dbService.getSongByID(h.id)
            .subscribe(data => {
              this.historyEmitter.emit(data);
            })
        }
    })

  }
}
