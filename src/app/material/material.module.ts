import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule
  ],
  exports: [MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatCardModule, MatInputModule]
})
export class MaterialModule { }
