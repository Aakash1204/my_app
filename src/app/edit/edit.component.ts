import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, startWith } from 'rxjs/operators';
import { ModifyDialogComponent } from '../modify-dialog/modify-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: any;
  totalData: any = [];
  options: string[] = [];
  filteredOptions: any;
  credentials: any = [];
  mainData: any;
  fetchAllData: any = [];
  toModify: any;
  typedName: any;

  constructor(public fb: FormBuilder, private toastr: ToastrService, public dialog: MatDialog) { }

  createEditForm() {
    this.editForm = this.fb.group({
      'acntName': ['', Validators.required]
    });
  }

  openDialog(data: any){
    let dialogRef = this.dialog.open(ModifyDialogComponent, {
      width: '350px',
      data: {acntName: data.acntName, userId: data.userId, password: data.password},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.modifyData(result);
      }
    });
  }

  modifyData(result: any) {
    for(let i=0; i<this.fetchAllData.length; i++){
      if(this.typedName.toUpperCase() == this.fetchAllData[i].acntName.toString().toUpperCase()){
        this.fetchAllData.splice(i,1);
      }
    }
    this.fetchAllData.push(result);
    localStorage.setItem('acnt_data', JSON.stringify(this.fetchAllData));
    this.toastr.success('Account updated successfully!');
    this.editForm.reset();
  }

  modify(){
    this.toModify = this.fetchAllData.find((a: any) => a.acntName.toUpperCase() === this.editForm.get('acntName').value.toUpperCase())
    this.typedName = this.editForm.get('acntName').value.toUpperCase()
    this.openDialog(this.toModify);
    
  }
  
  delete(){
    for(let i=0; i<this.fetchAllData.length; i++){
      if(this.editForm.get('acntName').value.toUpperCase() == this.fetchAllData[i].acntName.toString().toUpperCase()){
        this.fetchAllData.splice(i,1);
        localStorage.setItem('acnt_data', JSON.stringify(this.fetchAllData));
        this.toastr.success('Account deleted successfully!');
        this.editForm.reset();
      }
    }
  }

  ngOnInit() {
    this.createEditForm();
    if(localStorage.getItem('acnt_data')){
      this.mainData = localStorage.getItem('acnt_data');
      this.fetchAllData = JSON.parse(this.mainData)
    }
    this.fetchAllData.map((acntNames: any) => {
      this.options.push(acntNames.acntName.toString())
    })
    this.filteredOptions = this.editForm.get('acntName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.fetchAllData.filter((option: any) => option.acntName.toLowerCase().includes(filterValue));
  }
}
