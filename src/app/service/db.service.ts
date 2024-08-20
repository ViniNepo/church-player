import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SongDTO} from "../model/dto/songDTO";
import {Album} from "../model/album";
import {Worship} from "../model/worship";
import {WorshipDTO} from "../model/dto/worship-programDTO";
import {catchError, Observable, take, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient) {
  }

  getSearchSongs() {
    return this.http.get<SongDTO[]>("http://localhost:3000/songs?_expand=album&_sort=name")
  }

  getWorshipByID(id: number) {
    return this.http.get<WorshipDTO>(`http://localhost:3000/worships/${id}?_embed=moments`)
  }

  //ALBUMS
  findAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('/api/albums');
  }
  findAlbumByID(id: string): Observable<Album> {
    return this.http.get<Album>(`/api/albums/${id}`);
  }
  updateAlbum(album: Album) {
    return this.http.patch<Album>('/api/albums', album).pipe(
      catchError(error => {
        console.error('Update failed', error);
        return throwError(error);
      })
    );
  }
  deleteAlbum(id: string) {
    return this.http.delete<Album>(`/api/albums/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  //WORSHIP
  findAllWorships(): Observable<Worship[]> {
    return this.http.get<Worship[]>('/api/worships');
  }
}
