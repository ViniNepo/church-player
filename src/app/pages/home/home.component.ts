import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  programs: string[] = ["Novo album","Novo album","Novo album","Novo album","Alvo mais que a neve", "Vos sois o sal da terra", "Achei um grande amigo","Alvo mais que a neve", "Vos sois o sal da terra", "Achei um grande amigo","Alvo mais que a neve", "Vos sois o sal da terra", "Achei um grande amigo", "Vos sois o sal da terra"];


  constructor() {
  }
  ngOnInit() {
  }
}
