import { Component } from '@angular/core';
import {Music} from "../../model/music";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Album} from "../../model/album";

@Component({
  selector: 'app-add-album-dialog',
  templateUrl: './add-album-dialog.component.html',
  styleUrls: ['./add-album-dialog.component.scss']
})
export class AddAlbumDialogComponent {

  album: Album = {id: 0, name: "", image: ""}

  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddAlbumDialogComponent>,
    private  formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      album_name: [null],
      image: [null],
    })
  }

  onSubmit(album: Album): void {
    this.dialogRef.close(album);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
