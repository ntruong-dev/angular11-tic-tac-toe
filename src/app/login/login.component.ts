import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formDangNhap: FormGroup = new FormGroup({});
  defaultAccount = {
    username: 'test@example.com',
    password: '123456'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.formDangNhap = new FormGroup({
      userName: new FormControl(this.defaultAccount.username, Validators.required),
      password: new FormControl(this.defaultAccount.password, Validators.required)
    });
  }

  dangNhap(reactiveForm: FormGroup): void {
    if ((reactiveForm.value.userName === this.defaultAccount.username) && (reactiveForm.value.password === this.defaultAccount.password)) {
      localStorage.setItem('userTicTacToe', JSON.stringify(this.defaultAccount));
      this.router.navigate(['']);
    } else {
      alert('Invalid username or password!');
    }
  }

}
