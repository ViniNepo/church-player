import { Component } from '@angular/core';
import {Album} from "../../model/album";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Worship} from "../../model/worship";

@Component({
  selector: 'app-add-worship-dialog',
  templateUrl: './add-worship-dialog.component.html',
  styleUrls: ['./add-worship-dialog.component.scss']
})
export class AddWorshipDialogComponent {

  worship: Worship = {id: 0, name: "", image: ""}

  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddWorshipDialogComponent>,
    private  formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      worship_name: [null],
      image: [null],
    })
  }

  onSubmit(worship: Worship): void {
    this.dialogRef.close(worship);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
