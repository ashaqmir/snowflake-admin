import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppBannerImageService } from '../shared/app-banner-image.service';
import { IBannerImage } from '../../../models/banner-image';

@Component({
  selector: 'app-banner-image-form',
  templateUrl: './app-banner-image-form.component.html',
  styleUrls: ['./app-banner-image-form.component.css']
})
export class AppBannerImageFormComponent implements OnInit {
  pageTitle = 'Add Banner Image';
  currentImage: any = new IBannerImage();

  fileSelectedIsValid = false;
  showFileError = false;
  showProgress = false;
  showSuccessMessage = false;
  showUploadError = false;
  subscription: any;

  constructor(private router: Router,
    private bnrImgSvc: AppBannerImageService) { }

  ngOnInit() {
    this.fileSelectedIsValid = false;

    this.subscription = this.bnrImgSvc.getChangeEmitter()
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
    this.bnrImgSvc.pushBannerImage(this.currentImage);
    this.currentImage.progress = 30;
    console.log(this.currentImage);
  }

  setFileFlags() {
    this.fileSelectedIsValid = false;
    this.showFileError = true;
  }

  back() {
    this.router.navigate(['/dashboard/bannerimagelist']);
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
