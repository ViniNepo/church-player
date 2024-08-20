import {Component, OnInit} from '@angular/core';
import {DBService} from "../../service/db.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {delay, Observable, Subscription} from "rxjs";
import {Song} from "../../model/song";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-left-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  file: Array<File>;
  showAlbumModal = false;
  showWorshipModal = false;
  form: FormGroup;
  subscription: Subscription

  constructor(
    private dbService: DBService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      image: [null],
    })
  }

  onChange(event) {
    this.file = event.target.files
    this.form.controls['image'].setValue(this.file[0].name)
  }

  addAlbum(): void {
  }

  addWorship(): void {

  }

  onAlbumCancel(): void {
    this.toggleAlbumModal()
  }

  onWorshipCancel(): void {
    this.toggleWorshipModal()
  }

  toggleAlbumModal() {
    this.form.reset()
    this.showAlbumModal = !this.showAlbumModal;
  }

  toggleWorshipModal() {
    this.form.reset()
    this.showWorshipModal = !this.showWorshipModal;
  }

  playSong(song: Song) {
  }

}
