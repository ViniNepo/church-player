import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Music} from "../../model/music";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss']
})
export class AddSongDialogComponent implements OnInit {

  music: Music = {id: 0, name: "", number: 0, timesPlayed: 0, duration: 0, file: ""}

  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddSongDialogComponent>,
    private  formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      song_name: [null],
      song_number: [null],
      file: [null],
    })
  }

  ngOnInit() {
  }

  onSubmit(music: Music): void {
    this.dialogRef.close(music);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
