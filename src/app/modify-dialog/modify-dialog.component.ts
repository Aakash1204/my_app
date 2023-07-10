import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.css']
})
export class ModifyDialogComponent implements OnInit{
  modifyForm: any;
  constructor(
    public dialogRef: MatDialogRef<ModifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  createModifyForm(){
    this.modifyForm = new FormGroup({
      acntName: new FormControl(this.data.acntName, Validators.required),   
      userId: new FormControl(this.data.userId, Validators.required),   
      password: new FormControl(this.data.password, Validators.required) 
    }); 
  }

  modify(){
    if(this.modifyForm.valid){
      this.dialogRef.close(this.modifyForm.value)
    }
  }

  ngOnInit() {
    this.createModifyForm();
  }
}
