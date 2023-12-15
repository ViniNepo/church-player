import {Component, EventEmitter, Input} from '@angular/core';
import {AppComponent} from "../../app.component";
import {AppModule} from "../../app.module";
import {SoundControlService} from "../../service/sound-control.service";

@Component({
  selector: 'app-sound-control-panel',
  templateUrl: './sound-control-panel.component.html',
  styleUrls: ['./sound-control-panel.component.scss']
})
export class SoundControlPanelComponent {

  constructor(private soundControlService: SoundControlService) {
  }

  showQueue() {
    this.soundControlService.activateQueue()
  }

}
