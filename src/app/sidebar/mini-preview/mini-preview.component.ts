import {Component, OnInit} from '@angular/core';
import {SoundControlService} from "../../service/sound-control.service";

@Component({
  selector: 'app-mini-preview',
  templateUrl: './mini-preview.component.html',
  styleUrls: ['./mini-preview.component.scss']
})
export class MiniPreviewComponent implements OnInit {
  showQueue = false;
  musics: string[] = ["teste","teste","teste","teste","teste","teste","Achei um grande amigo","Achei um grande amigo","Achei um grande amigo", "Alvo mais que a neve", "Vos sois o sal da terra", "Achei um grande amigo", "Alvo mais que a neve", "Vos sois o sal da terra"];

  constructor(private soundControlService: SoundControlService) {
  }

  ngOnInit() {
    this.soundControlService.showQueueEmitter.subscribe(
      queue => this.showQueue = queue
    )
  }

}
