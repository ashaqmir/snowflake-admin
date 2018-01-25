import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductImageService } from './product-image.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
  ],
  declarations: [],
  providers: [
    ProductImageService,
  ]
})
export class ProductImageModule { }
