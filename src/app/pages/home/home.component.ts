import {Component, OnInit} from '@angular/core';
import {Album} from "../../model/album";
import {Worship} from "../../model/worship";
import {DBService} from "../../service/db.service";
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {AlbumDTO} from "../../model/dto/albumDTO";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  time: string
  albums: Album[];
  worships: Worship[];


  constructor(private dbService: DBService) {
    this.time = "Good Afternoon!"
  }

  ngOnInit() {
    this.dbService.findAllAlbums().subscribe({
      next: (albums: Album[]) => {
        this.albums = albums
        this.sendData(albums)
        console.log('Albums getted:');
      },
      error: (error) => {
        console.error('Failed to load albums', error);
      }
    });

    this.dbService.findAllWorships().subscribe({
      next: (worships: Worship[]) => {
        this.worships = worships
        console.log('Worship getted:');
      },
      error: (error) => {
        console.error('Failed to load worships', error);
      }
    });
  }

  sendData(albums: Album[]) {
    this.dbService.changeData(albums);
  }
}
