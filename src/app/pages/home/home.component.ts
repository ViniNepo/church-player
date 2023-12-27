import {Component, OnInit} from '@angular/core';
import {Album} from "../../model/album";
import {Worship} from "../../model/worship";
import {DBService} from "../../service/db.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  time: string
  albums$: Observable<Album[]>;
  worships$: Observable<Worship[]>;


  constructor(private dbService: DBService) {
    this.time = "Good Afternoon!";
  }

  ngOnInit() {
    this.albums$ = this.dbService.getAlbums()
    this.worships$ = this.dbService.getWorship()
  }
}
