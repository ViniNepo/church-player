import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class SoundControlService {

  showQueue = false;

  showQueueEmitter = new EventEmitter<boolean>();

  constructor() { }

  activateQueue() {
    this.showQueue = !this.showQueue
    this.showQueueEmitter.emit(this.showQueue)
  }
}
