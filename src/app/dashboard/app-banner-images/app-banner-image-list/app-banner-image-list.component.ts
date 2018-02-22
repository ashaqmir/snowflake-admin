import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { AppBannerImageService } from '../shared/app-banner-image.service';
import { IBannerImage } from '../../../models/banner-image';

@Component({
  selector: 'app-banner-image-list',
  templateUrl: './app-banner-image-list.component.html',
  styleUrls: ['./app-banner-image-list.component.css']
})
export class AppBannerImageListComponent implements OnInit {
  showSpinner = true;
  bannerImages: Observable<IBannerImage[]>;
  currentImages: Observable<IBannerImage[]>;

  title: string;

  constructor(
    private router: Router,
    private prodImgSvc: AppBannerImageService
  ) {
    this.bannerImages = this.prodImgSvc.getBannerImages();
    this.bannerImages.subscribe(() => {
      // this.currentImages=_.take(this.productImages,5);
      this.currentImages = this.bannerImages;
      this.showSpinner = false;
    });
  }

  ngOnInit() {}

  addProductImage() {
    this.router.navigate(['/dashboard/addbannerimage/new']);
  }

  searchImages() {
    if (this.title) {
      this.currentImages = this.bannerImages.map(pImgs =>
        pImgs.filter(pImg => {
          return pImg.title === this.title;
        })
      );
    } else {
      this.currentImages = this.bannerImages;
    }
  }

  clearFilter() {
    this.title = '';
    this.currentImages = this.bannerImages;
  }

  deleteImage(prodImage) {
    if (prodImage) {
      this.prodImgSvc.deleteBannerImage(prodImage);
    }
  }
}
