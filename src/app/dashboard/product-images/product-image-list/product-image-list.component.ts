import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ProductImageService } from '../shared/product-image.service';
import { Observable } from 'rxjs/Observable';
import { IProductImage } from '../../../models/product-image';
@Component({
  selector: 'app-product-image-list',
  templateUrl: './product-image-list.component.html',
  styleUrls: ['./product-image-list.component.css']
})
export class ProductImageListComponent implements OnInit {
  showSpinner = true;
  productImages: Observable<IProductImage[]>;
  currentImages: Observable<IProductImage[]>;

  imgTag: string;
  imgLocation: string;

  constructor(private router: Router,
    private prodImgSvc: ProductImageService) {

    this.productImages = this.prodImgSvc.getProductImages();
    this.productImages.subscribe(() => {
      // this.currentImages=_.take(this.productImages,5);
      this.currentImages = this.productImages;
      this.showSpinner = false;
    });
  }

  ngOnInit() {
  }

  addProductImage() {
    this.router.navigate(['/dashboard/addproductimage/new']);
  }

  searchImages() {
    if (this.imgLocation && this.imgTag) {
      this.currentImages = this.productImages.map(pImgs => pImgs.filter(pImg => {
        return ((pImg.location === this.imgLocation) && pImg.tags.includes(this.imgTag));
      }));
    } else if (this.imgLocation) {
      this.currentImages = this.productImages.map(pImgs => pImgs.filter(pImg => pImg.location === this.imgLocation));
    } else if (this.imgTag) {
      this.currentImages = this.productImages.map(pImgs => pImgs.filter(pImg => {
        return pImg.tags.includes(this.imgTag);
      }));
    } else {
      this.currentImages = this.productImages;
    }
  }

  clearFilter() {
    this.imgLocation = '';
    this.imgTag = '';
    this.currentImages = this.productImages;
  }

  deleteImage(prodImage) {
    if (prodImage) {
      this.prodImgSvc.deleteProductImage(prodImage);
    }
  }
}
