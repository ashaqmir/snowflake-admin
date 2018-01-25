import { ProductImage } from './../../../models/product-image';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-image-form',
  templateUrl: './product-image-form.component.html',
  styleUrls: ['./product-image-form.component.css']
})
export class ProductImageFormComponent implements OnInit {
  pageTitle = 'Add Product Image';
  currentImage: any = new ProductImage();

  fileSelectedinValid = true;
  showFileError = false;
  constructor() { }

  ngOnInit() {
    this.fileSelectedinValid = true;

  }
  onImageChangeFromFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.currentImage.file = file;
      this.fileSelectedinValid = false;
      this.showFileError = false;
    } else if (this.currentImage.file) {
      this.fileSelectedinValid = false;
      this.showFileError = false;
    } else {
      this.fileSelectedinValid = true;
      this.showFileError = true;
    }

    console.log(`Selectd ${this.fileSelectedinValid}`);
    console.log(`Show Error ${this.showFileError}`);
  }
  save() {

    console.log(this.currentImage);
  }

  setFileFlags() {
    this.fileSelectedinValid = false;
    this.showFileError = true;
  }
}
