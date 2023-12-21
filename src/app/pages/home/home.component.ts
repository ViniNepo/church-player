import {Component, OnInit} from '@angular/core';
import {Album} from "../../model/album";
import {WorshipProgram} from "../../model/worship-program";
import {AlbumService} from "../../service/album.service";
import {WorshipService} from "../../service/worship.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  time: string
  albums: Album[] = [];
  worships: WorshipProgram[] = [];


  constructor(private albumService: AlbumService, private worshipService: WorshipService) {
    this.time = "Good Afternoon!";
  }
  ngOnInit() {
    //load album
    //load worship
  }
}
