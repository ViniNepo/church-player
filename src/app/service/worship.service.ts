import { Injectable } from '@angular/core';
import {Album} from "../model/album";

@Injectable({
  providedIn: 'root'
})
export class WorshipService {

  constructor() { }

  post(album: Album) {
    // salvar no banco
  }

  put(album: Album) {
    // salvar no banco
  }

  getAll() {
    //get all
  }

  getByID(id: number) {
    //get by id
  }
}
