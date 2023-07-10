import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchForm: any;
  filterDatas: any;
  mainData: any;

  constructor(public dialog: MatDialog){}

  createSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),   
    });    
  }

  fetchAllData(){
    this.filterDatas = JSON.parse(this.mainData)
  }

  fetchData(){
    this.firstFunc()
  }

  openDialog(data: any){
    this.dialog.open(AccountDetailsComponent, {
      width: '350px',
      data: {acntName: data.acntName, userId: data.userId, password: data.password},
    });
  }
  
  search(){
    if(this.searchForm.get('search').value !== ''){
      this.filterDatas = [];
      JSON.parse(this.mainData).map((each: any) => {
        if(each.acntName.includes(this.searchForm.get('search').value.toUpperCase())){
          this.filterDatas.push(each);
        }
      })
    }
    else{
      this.fetchAllData();
    }
  }

  firstFunc(){
    if(localStorage.getItem('acnt_data')){
      this.mainData = localStorage.getItem('acnt_data');
    }
    this.createSearchForm();
    this.fetchAllData();
  }
  
  ngOnInit() {
    this.firstFunc();
  }
}
