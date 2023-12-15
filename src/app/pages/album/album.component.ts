import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit{

  musics: string[] = ["","","","","","","","","","","","","Achei um grande amigo","Achei um grande amigo","Achei um grande amigo", "Alvo mais que a neve", "Vos sois o sal da terra", "Achei um grande amigo", "Alvo mais que a neve", "Vos sois o sal da terra"];

  constructor() {
  }

  ngOnInit() {
  }
}
