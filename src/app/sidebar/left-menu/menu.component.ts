import {Component, OnInit} from '@angular/core';
import {DBService} from "../../service/db.service";
import {Router} from "@angular/router";
import {Song} from "../../model/song";
import {ToastrService} from 'ngx-toastr';
import {CreateAlbumDTO} from "../../model/dto/albumDTO";
import {CreateWorshipDTO} from "../../model/dto/worship-programDTO";
import {Album} from "../../model/album";
import {Worship} from "../../model/worship";

@Component({
  selector: 'app-left-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  file: Array<File>;
  showAlbumModal = false;
  showWorshipModal = false;
  newAlbumName = ""
  newWorshipName = ""
  albums: Album[]

  constructor(
    private dbService: DBService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.dbService.findAllAlbums().subscribe({
      next: (album: Album[]) => {
        this.albums = album
        console.log('Albums loaded:');
        console.log(this.albums)
      },
      error: (error) => {
        console.error('Error getting albums:', error);
      }
    });

  }

  toggleAlbumModal() {
    this.showAlbumModal = !this.showAlbumModal;
  }

  toggleWorshipModal() {
    this.showWorshipModal = !this.showWorshipModal;
  }

  redirect(id: string) {
    this.router.navigate(['/album', id])
  }

  createAlbum() {
    let album: CreateAlbumDTO = new CreateAlbumDTO(this.newAlbumName, "")
    this.dbService.createAlbum(album).subscribe({
      next: () => {
        this.dbService.findAllAlbums().subscribe({
          next: (album: Album[]) => {
            this.albums = album
            let id: string = album[album.length - 1].id
            this.router.navigate(['/album', id])
            console.log('Album created:');
          },
          error: (error) => {
            console.error('Error getting new album:', error);
          }
        });

        console.log('Album created:');
      },
      error: (error) => {
        console.error('Error creating new album:', error);
      }
    });
    this.newAlbumName = ""
    this.toggleAlbumModal()
  }

  createWorship() {
    let worship: CreateWorshipDTO = new CreateWorshipDTO(this.newWorshipName, "")
    this.dbService.createWorship(worship).subscribe({
      next: () => {
        this.dbService.findAllWorships().subscribe({
          next: (worships: Worship[]) => {
            let id: string = worships[worships.length - 1].id
            this.router.navigate(['/worship', id])
            console.log('Worship created:');
          },
          error: (error) => {
            console.error('Error getting new worship:', error);
          }
        });

        console.log('Worship created:');
      },
      error: (error) => {
        console.error('Error creating new worship:', error);
      }
    });
    this.newWorshipName = ""
    this.toggleWorshipModal()
  }

}
