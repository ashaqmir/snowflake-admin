import { IProductImage } from './../../../models/product-image';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductImageService } from '../shared/product-image.service';

@Component({
  selector: 'app-product-image-form',
  templateUrl: './product-image-form.component.html',
  styleUrls: ['./product-image-form.component.css']
})
export class ProductImageFormComponent implements OnInit {
  pageTitle = 'Add Product Image';
  currentImage: any = new IProductImage();

  fileSelectedIsValid = false;
  showFileError = false;
  showProgress = false;
  showSuccessMessage = false;
  showUploadError = false;
  subscription: any;

  constructor(private router: Router,
    private prodImgSvc: ProductImageService) { }

  ngOnInit() {
    this.fileSelectedIsValid = false;

    this.subscription = this.prodImgSvc.getChangeEmitter()
      .subscribe(status => this.updateUploadStatus(status));
  }

  onImageChangeFromFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.currentImage.file = file;
      this.fileSelectedIsValid = true;
      this.showFileError = false;
      console.log('1');
    } else {
      this.currentImage.file = null;
      this.fileSelectedIsValid = false;
      this.showFileError = true;
      console.log('3');
    }
    console.log(`Selectd ${this.fileSelectedIsValid}`);
    console.log(`Show Error ${this.showFileError}`);
  }
  save() {
    this.prodImgSvc.pushProductImage(this.currentImage);
    this.currentImage.progress = 30;
    console.log(this.currentImage);
  }

  setFileFlags() {
    this.fileSelectedIsValid = false;
    this.showFileError = true;
  }

  back() {
    this.router.navigate(['/dashboard/productimagelist']);
  }

  updateUploadStatus(status) {
    if (status === 'STARTED') {
      this.showProgress = true;
      this.showSuccessMessage = false;
      this.showUploadError = false;
    }

    if (status === 'COMPLETED') {
      this.showSuccessMessage = true;
      this.showProgress = false;
      this.showUploadError = false;
    }

    if (status === 'ERROR') {
      this.showUploadError = true;
      this.showSuccessMessage = false;
      this.showProgress = false;
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetMessage() {
    this.showUploadError = false;
    this.showSuccessMessage = false;
    this.showProgress = false;
  }
}
