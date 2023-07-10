import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: any;
  totalData: any = [];
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };
  fileName: string = 'SheetJS.xlsx';
  formattedExcelData : any = [];


  constructor(public fb: FormBuilder, private toastr: ToastrService) { }
  createAddForm() {
    this.addForm = this.fb.group({
      'acntName': [null, Validators.required],
      'userId': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  

  import(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log("data:",this.data);
      for(let i=0; i<this.data.length; i++){
        let eachObj = {acntName:this.data[i][0], userId: this.data[i][1], password: this.data[i][2]}
        this.formattedExcelData.push(eachObj)
      }
      localStorage.setItem('acnt_data', JSON.stringify(this.formattedExcelData));
      this.toastr.success('Imported from Excel file!');
    };
    reader.readAsBinaryString(target.files[0]);
    
  }

  add() {
    if (this.addForm.invalid) {
      this.toastr.error('Enter Account details!');
      return;
    }
    if (localStorage.getItem('acnt_data')) {
      this.totalData = localStorage.getItem('acnt_data');
    }
    let parsedData = this.totalData.length > 0 ? JSON.parse(this.totalData) : []
    parsedData.push({ acntName: this.addForm.get('acntName').value.toUpperCase(), userId: this.addForm.get('userId').value, password: this.addForm.get('password').value })
    localStorage.setItem('acnt_data', JSON.stringify(parsedData));
    this.toastr.success('Account details added successfully!');
    this.addForm.reset();
  }

  ngOnInit() {
    this.createAddForm();
  }
}
