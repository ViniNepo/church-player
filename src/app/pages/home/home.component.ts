import {Component, OnInit} from '@angular/core';
import {Album} from "../../model/album";
import {Worship} from "../../model/worship";
import {DBService} from "../../service/db.service";
import {BehaviorSubject, catchError, Observable, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  time: string
  albums$: Observable<Album[]>;
  error$ = new BehaviorSubject<string | null>(null);
  worships$: Observable<Worship[]>;


  constructor(private dbService: DBService) {
    this.time = "Good Afternoon!"
  }

  ngOnInit() {
    this.albums$ = this.dbService.findAllAlbums().pipe(
      catchError(error => {
        this.error$.next('Failed to load albums'); // Armazena a mensagem de erro
        return of([]); // Retorna um array vazio para evitar que o template quebre
      })
    );

    this.worships$ = this.dbService.findAllWorships().pipe(
      catchError(error => {
        this.error$.next('Failed to load worships'); // Armazena a mensagem de erro
        return of([]); // Retorna um array vazio para evitar que o template quebre
      })
    );
  }
}
