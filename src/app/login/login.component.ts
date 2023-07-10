import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  name: any;
  fetchDetails: any;
  createPin: boolean = false;
  fetchName: any;

  constructor(public router: Router, private toastr: ToastrService) { }

  createLoginForm() {
    this.loginForm = new FormGroup({
      pin: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{4}$")]),
    });
  }


  login() {
    if (this.createPin) {
      return;
    }
    if (this.loginForm.get('pin').value.toString().length === 4) {
      if (this.loginForm.get('pin').value.toString() === JSON.parse(this.fetchDetails).pin.toString()) {
        this.router.navigate(['/main-app']);
      }
      else {
        this.toastr.error('Incorrect Password');
      }
    }
  }

  generatePin() {
    if (this.loginForm.get('pin').value.toString().length === 4) {
      localStorage.setItem('acnt_pass', JSON.stringify({ pin: this.loginForm.get('pin').value }));
      this.router.navigate(['/main-app']);
    }
  }

  ngOnInit() {
    this.createLoginForm();
    this.fetchDetails = localStorage.getItem('acnt_pass');
    this.fetchName = localStorage.getItem('acnt_details')
    this.name = JSON.parse(this.fetchName).name.toString();
    if (this.fetchDetails === null) {
      this.createPin = true;
    }
    else {
      this.createPin = false;
    }
  }
}
