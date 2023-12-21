import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historyEmitter = new EventEmitter<number>();

  constructor() { }

  sendMusicToHistory(id: number) {
    this.historyEmitter.emit(id)
  }
}
