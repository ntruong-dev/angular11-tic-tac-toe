import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockRouter { public navigate() { } }

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useClass: MockRouter }
      ],
      imports: [BrowserAnimationsModule, MaterialModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login function should be login successful', () => {
    const formDangNhap = new FormGroup({
      userName: new FormControl('test@example.com'),
      password: new FormControl('123456')
    });
    component.defaultAccount = {
      username: 'test@example.com',
      password: '123456'
    };
    component.dangNhap(formDangNhap);
    expect(localStorage.getItem('userTicTacToe')).toBeDefined();
  });

  it('login function should be login failed', () => {
    const formDangNhap = new FormGroup({
      userName: new FormControl('test'),
      password: new FormControl('1234')
    });
    component.defaultAccount = {
      username: 'test@example.com',
      password: '123456'
    };
    expect(component.dangNhap(formDangNhap)).toBeUndefined();
  });
});
