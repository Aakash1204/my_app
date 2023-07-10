import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
  loginData: any;
  form: any;

  constructor(public router: Router){}

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),   
    });    
  }

  start(){
    if(this.form.valid){
      localStorage.setItem('acnt_details', JSON.stringify({name: this.form.get('name').value}));
      this.router.navigate(['/login']);
    }
  }
  
  
  ngOnInit() {
    this.createForm();
    this.loginData = localStorage.getItem('acnt_details');
  }
}
