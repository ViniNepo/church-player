import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-worship-program',
  templateUrl: './worship-program.component.html',
  styleUrls: ['./worship-program.component.scss']
})
export class WorshipProgramComponent implements OnInit{

  musics: string[] = ["","","","","","","","","","","","","Achei um grande amigo","Achei um grande amigo","Achei um grande amigo", "Alvo mais que a neve", "Vos sois o sal da terra", "Achei um grande amigo", "Alvo mais que a neve", "Vos sois o sal da terra"];
  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  addSong(): void {
    this.musics.push("nova coisa")
  }

  deleteSong(val: number) {
    console.log(val);
    this.musics.splice(val, 1);
  }
}
