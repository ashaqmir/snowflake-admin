import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../models/product';
import { Observable } from 'rxjs/Observable';
import { IFeature } from '../../../models/feature';
import { FeatureService } from '../../features/shared/feature.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  pageTitle: string;
  productKey: string;
  public productDetails: IProduct = new IProduct();
  totalPrice: number;
  features: Observable<IFeature[]>;
  featureList: any = [];
  // selectedFeatures: IFeature[];
  selectedFeatures: Array<IFeature> = [];
  constructor(private prodSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private featureSvc: FeatureService) {
    this.features = this.featureSvc.getFeatureList();

    this.featureList = this.features.map(res => {
      return res.map(ftr => {
        return {
          value: ftr.$key,
          text: ftr.shortDescription
        };
      });
    });
  }

  ngOnInit() {
    const key = this.route.params.subscribe(params => {
      this.productKey = params['id'];
      console.log(this.productKey);
      this.pageTitle = this.productKey ? 'Edit Product' : 'Add Product';

      if (!this.productKey) {
        return;
      }

      this.prodSvc.getProduct(this.productKey).subscribe(product => {
        console.log(product);
        if (product) {

          this.productDetails = product;


          this.selectedFeatures = this.productDetails.features;
        }
      });
    });
    console.log('fature list');
    console.log(this.featureList);
  }

  save() {
    if (this.productDetails.features && this.productDetails.features.length > 0) {
      this.productDetails.features = [];
    }
    if (!this.productDetails.features) {
      this.productDetails.features = [];
    }
    this.selectedFeatures.forEach(ftr => {
      ftr.$key = undefined;
      delete (ftr.$key);
      this.productDetails.features.push(ftr);
    });
    // this.productDetails.features = this.selectedFeatures;

    if (!this.productKey) {
      this.prodSvc.createProduct(this.productDetails).then(prod => {
        this.router.navigate(['/dashboard/productlist']);
      });
    } else {
      this.prodSvc.updateProduct(this.productKey, this.productDetails);
      this.router.navigate(['/dashboard/productlist']);
    }
    console.log(this.productDetails);
    // console.log(product);
  }

  onFeatureSelect(val) {
    console.log(val);
    if (val) {
      const selectedFeature = this.features.map(res => {
        return res.find(ftr => ftr.$key === val);
      });

      selectedFeature.subscribe(res => {
        const existingElm = this.selectedFeatures.find(ftr => ftr.$key === res.$key);
        if (!existingElm) {
          this.selectedFeatures.push(res as IFeature);
        }
      });

    }
  }

  removeSelectedFeature(val) {
    const existingElmIndex = this.selectedFeatures.findIndex(ftr => ftr.$key === val);
    if (existingElmIndex >= 0) {
      this.selectedFeatures.splice(existingElmIndex, 1);
    }
  }

  priceInfoChanged(val: string) {
    const pPegX = /^[1-9][0-9]*(?:\.\d*)?$/g;
    if (pPegX.test(val)) {
      const dtRegX = /^0\.\d{1,3}$/g;
      if (dtRegX.test(this.productDetails.discount.toString())) {
        this.productDetails.discountPrice = this.productDetails.price - (this.productDetails.discount * this.productDetails.price);
      } else {
        this.productDetails.discountPrice = this.productDetails.price;
      }

      if (dtRegX.test(this.productDetails.taxPer.toString())) {
        this.productDetails.finalPrice = this.productDetails.discountPrice +
          (this.productDetails.taxPer * this.productDetails.discountPrice);
      } else {
        this.productDetails.finalPrice = this.productDetails.discountPrice;
      }
    }
  }

  discountChanged(val: string) {
    const regX = /^0\.\d{1,3}$/g;
    if (regX.test(val)) {
      this.productDetails.discountPrice = this.productDetails.price - (this.productDetails.discount * this.productDetails.price);
      this.productDetails.finalPrice = this.productDetails.discountPrice;
    } else {
      this.productDetails.discountPrice = this.productDetails.price;
      this.productDetails.finalPrice = this.productDetails.discountPrice;
    }

  }

  taxChanged(val: string) {
    const regX = /^0\.\d{1,3}$/g;
    if (regX.test(val)) {
      this.productDetails.finalPrice = this.productDetails.discountPrice + (this.productDetails.taxPer * this.productDetails.discountPrice);
    } else {
      this.productDetails.finalPrice = this.productDetails.discountPrice;
    }
  }

  back() {
    this.router.navigate(['/dashboard/productlist']);
  }
}
