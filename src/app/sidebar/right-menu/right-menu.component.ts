import {Component, OnInit} from '@angular/core';
import {SoundControlService} from "../../service/sound-control.service";

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {
  showQueue = false;
  isQueueNull = true;
  // musics: string[] = ["teste","teste","teste","teste","teste","teste","Achei um grande amigo","Achei um grande amigo","Achei um grande amigo", "Alvo mais que a neve", "Vos sois o sal da terra", "Achei um grande amigo", "Alvo mais que a neve", "Vos sois o sal da terra"];
  musics: string[] = [];

  constructor(private soundControlService: SoundControlService) {
  }

  ngOnInit() {
    this.soundControlService.showQueueEmitter.subscribe(
      queue => this.showQueue = queue
    )

    if (this.musics.length > 0) {
      this.isQueueNull = false
    }
  }

}
