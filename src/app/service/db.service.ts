import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CreateSongDTO, SongDTO, SongUpdateOrderDTO, SongWithAlbumDTO} from "../model/dto/songDTO";
import {Album} from "../model/album";
import {Worship} from "../model/worship";
import {CreateWorshipDTO, WorshipDTO} from "../model/dto/worship-programDTO";
import {BehaviorSubject, catchError, Observable, take, tap, throwError} from "rxjs";
import {Song} from "../model/song";
import {AlbumDTO, CreateAlbumDTO} from "../model/dto/albumDTO";
import {Moment} from "../model/moment";
import {CreateMomentDTO, MomentOrderDTO} from "../model/dto/momentDTO";
import {CreateSectionDTO} from "../model/dto/sectionDTO";
import {Section} from "../model/section";

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient) {
  }

  private dataSource = new BehaviorSubject<Album[]>(null);

  // Observable que será usado para assinar
  currentData = this.dataSource.asObservable();

  // Método para atualizar os dados
  changeData(data: Album[]) {
    this.dataSource.next(data);
  }

  changeDataName(a: Album) {
    this.dataSource.subscribe(albums => {
        albums.forEach(album => {
          if (a.id == album.id) {
            album.title = a.title
          }
        });
    });
  }

  playSong(path: string) {
    return this.http.get(`http://localhost:8080/file-control/${path}`).pipe(
      catchError(error => {
        console.error('Error while trying to play song', error);
        return throwError(error);
      })
    );
  }

  //ALBUMS
  createAlbum(album: CreateAlbumDTO) {
    return this.http.post('http://localhost:8080/albums', album).pipe(
      catchError(error => {
        console.error('Creating album failed', error);
        return throwError(error);
      })
    );
  }
  findAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('http://localhost:8080/albums').pipe(
      catchError(error => {
        console.error('Error getting all albums', error);
        return throwError(error);
      })
    );
  }

  findAlbumByID(id: string): Observable<AlbumDTO> {
    return this.http.get<AlbumDTO>(`http://localhost:8080/albums/${id}`).pipe(
      catchError(error => {
        console.error('Error getting album by id', error);
        return throwError(error);
      })
    );
  }

  updateAlbum(data: FormData) {
    return this.http.patch<Album>('http://localhost:8080/albums', data).pipe(
      catchError(error => {
        console.error('Update failed', error);
        return throwError(error);
      })
    );
  }

  deleteAlbum(id: string) {
    return this.http.delete(`http://localhost:8080/albums/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  //SONGS
  deleteSong(id: string) {
    return this.http.delete(`http://localhost:8080/songs/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  createSong(albumID: string, data: FormData) {
    return this.http.post(`http://localhost:8080/songs/${albumID}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.includes('already exists')) {
          alert(`Alert: ${error.error}!`)
          console.error('file exists', error.error.message);
        }
        console.error('Update failed', error);
        return throwError(error);
      })
    );
  }

  updateSong(song: Song) {
    return this.http.patch<Song>('http://localhost:8080/songs', song).pipe(
      catchError(error => {
        console.error('Update failed', error);
        return throwError(error);
      })
    );
  }

  updateSongOrder(songs: SongUpdateOrderDTO[]) {
    return this.http.patch<SongUpdateOrderDTO[]>('http://localhost:8080/songs/orders', songs).pipe(
      catchError(error => {
        console.error('Update orders failed', error);
        return throwError(error);
      })
    );
  }

  findAll(): Observable<SongWithAlbumDTO[]> {
    return this.http.get<SongWithAlbumDTO[]>(`http://localhost:8080/songs`).pipe(
      catchError(error => {
        console.error('Error getting all songs', error);
        return throwError(error);
      })
    );
  }

  //WORSHIP
  createWorship(worship: CreateWorshipDTO) {
    return this.http.post('http://localhost:8080/worships', worship).pipe(
      catchError(error => {
        console.error('Creating worship failed', error);
        return throwError(error);
      })
    );
  }
  findAllWorships(): Observable<Worship[]> {
    return this.http.get<Worship[]>('http://localhost:8080/worships');
  }

  getWorshipByID(id: string): Observable<WorshipDTO> {
    return this.http.get<WorshipDTO>(`http://localhost:8080/worships/${id}`)
  }

  updateWorship(data: FormData) {
    return this.http.patch<Worship>('http://localhost:8080/worships', data).pipe(
      catchError(error => {
        console.error('Update worship failed', error);
        return throwError(error);
      })
    );
  }

  deleteWorship(id: string) {
    return this.http.delete(`http://localhost:8080/worships/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  //MOMENTS
  updateMoment(moment: Moment) {
    return this.http.patch<Moment>('http://localhost:8080/moments', moment).pipe(
      catchError(error => {
        console.error('Update moment failed', error);
        return throwError(error);
      })
    );
  }

  updateMomentsOrder(moments: MomentOrderDTO[]) {
    return this.http.patch<SongUpdateOrderDTO[]>('http://localhost:8080/moments/orders', moments).pipe(
      catchError(error => {
        console.error('Update moments failed', error);
        return throwError(error);
      })
    );
  }

  createMoment(moment: CreateMomentDTO) {
    return this.http.post('http://localhost:8080/moments', moment).pipe(
      catchError(error => {
        console.error('Creating moment failed', error);
        return throwError(error);
      })
    );
  }

  deleteMoment(id: string) {
    return this.http.delete(`http://localhost:8080/moments/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  //SECTIONS
  createSection(section: CreateSectionDTO) {
    return this.http.post('http://localhost:8080/sections', section).pipe(
      catchError(error => {
        console.error('Creating section failed', error);
        return throwError(error);
      })
    );
  }

  updateSection(section: Section) {
    return this.http.patch<Section>('http://localhost:8080/sections', section).pipe(
      catchError(error => {
        console.error('Update section failed', error);
        return throwError(error);
      })
    );
  }

  deleteSection(id: string) {
    return this.http.delete(`http://localhost:8080/sections/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }
}
