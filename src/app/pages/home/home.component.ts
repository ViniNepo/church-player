import {Component, OnInit} from '@angular/core';
import {Album} from "../../model/album";
import {Worship} from "../../model/worship";
import {DBService} from "../../service/db.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  time: string
  albums: Album[] = [];
  worships: Worship[] = [];


  constructor(private dbService: DBService) {
    this.time = "Good Afternoon!";
  }

  ngOnInit() {
    this.dbService.getAlbums()
      .subscribe(data => {
        this.albums = data
      })

    this.dbService.getWorship()
      .subscribe(data =>{
        this.worships = data
      })
  }
}
