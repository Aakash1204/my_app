import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  passwordShow: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AccountDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clipboard: Clipboard
  ) {}

  togglePass(){
    this.passwordShow = !this.passwordShow;
  }

  copy(toCopy: any) {
    this.clipboard.copy(toCopy);
  }
}
