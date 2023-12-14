import {Component, OnInit, Output} from '@angular/core';
import {InterfaceService} from "./service/interface.service";
import {SoundControlService} from "./service/sound-control.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'church-player';

  constructor(private _interfaceService: InterfaceService, private _soundControlService: SoundControlService) {}

  ngOnInit() {
    this._soundControlService
  }
}
