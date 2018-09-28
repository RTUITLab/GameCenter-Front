import { Component, OnInit , Inject} from '@angular/core';

// from https://material.angular.io/components/dialog/examples Всплывающее окно для Добавления / удаления игр
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
////

@Component({
  selector: 'app-del-user',
  templateUrl: './del-user.component.html',
  styleUrls: ['./del-user.component.css']
})
export class DelUserComponent implements OnInit {
  constructor(
    // from https://material.angular.io/components/dialog/examples Всплывающее окно для Добавления / удаления игр
      public dialogRef: MatDialogRef<DelUserComponent>, // для всплывающего окна
      @Inject(MAT_DIALOG_DATA) public data: any, // для всплывающего окна
    ////
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
