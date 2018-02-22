import { Component, OnInit, Input } from "@angular/core";
import { ProductService } from "../shared/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { IProduct } from "../../../models/product";
import { Observable } from "rxjs/Observable";
import { forkJoin } from "rxjs/observable/forkJoin";
import { IFeature } from "../../../models/feature";
import { FeatureService } from "../../features/shared/feature.service";
import { async } from "@angular/core/testing";
import { ProductImageService } from "../../product-images/shared/product-image.service";
import { IProductImage } from "../../../models/product-image";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  pageTitle: string;
  productKey: string;
  public productDetails: IProduct = new IProduct();

  totalPrice: number;

  productFeatures: Observable<IFeature[]>;
  productFeatureList: any = [];
  selectedFeatures: Array<IFeature> = [];

  productImages: Observable<IProductImage[]>;
  productImageList: any = [];
  selectedImages: Array<IProductImage> = [];

  constructor(
    private prodSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private featureSvc: FeatureService,
    private productImageSvc: ProductImageService
  ) {
    this.productFeatures = this.featureSvc.getFeatureList();
    this.productFeatureList = this.productFeatures.map(res => {
      return res.map(ftr => {
        return {
          value: ftr.$key,
          text: ftr.shortDescription
        };
      });
    });
  }

  ngOnInit() {
    this.productImages = this.productImageSvc.getProductImages();
    this.productImageList = this.productImages.map(res => {
      return res.map(img => {
        return {
          value: img.$key,
          text: img.location + " [" + img.tags + "]"
        };
      });
    });

    const key = this.route.params.subscribe(params => {
      this.productKey = params["id"];
      console.log(this.productKey);
      this.pageTitle = this.productKey ? "Edit Product" : "Add Product";

      if (!this.productKey) {
        return;
      }

      this.prodSvc.getProduct(this.productKey).subscribe(product => {
        console.log(product);
        if (product) {
          this.productDetails = product;

          this.selectedFeatures = this.productDetails.features;
          this.selectedImages = this.productDetails.images;
        }
      });
    });
  }

  save() {
    if (
      this.productDetails.features &&
      this.productDetails.features.length > 0
    ) {
      this.productDetails.features = [];
    }
    if (!this.productDetails.features) {
      this.productDetails.features = [];
    }
    this.selectedFeatures.forEach(ftr => {
      ftr.$key = undefined;
      delete ftr.$key;
      this.productDetails.features.push(ftr);
    });

    if (this.productDetails.images && this.productDetails.images.length > 0) {
      this.productDetails.images = [];
    }
    if (!this.productDetails.images) {
      this.productDetails.images = [];
    }
    this.selectedImages.forEach(img => {
      img.$key = undefined;
      delete img.$key;
      this.productDetails.images.push(img);
    });
    // this.productDetails.features = this.selectedFeatures;

    if (!this.productKey) {
      this.prodSvc.createProduct(this.productDetails).then(prod => {
        this.router.navigate(["/dashboard/productlist"]);
      });
    } else {
      this.prodSvc.updateProduct(this.productKey, this.productDetails);
      this.router.navigate(["/dashboard/productlist"]);
    }
    console.log(this.productDetails);
    // console.log(product);
  }

  onFeatureSelect(val) {
    console.log(val);
    if (val) {
      const prodFeature = this.productFeatures.map(res => {
        return res.find(ftr => ftr.$key === val);
      });

      console.log("step 1");
      const subs = prodFeature.subscribe(result => {
        console.log("step 2");
        const existingElm = this.selectedFeatures.find(
          ftr => ftr.$key === result.$key
        );
        console.log(existingElm);
        if (!existingElm) {
          console.log("step 3");
          this.selectedFeatures.push(result as IFeature);
        }
      });
    }
  }
  onImageSelect(val) {
    console.log(val);
    if (val) {
      const prodImages = this.productImages.map(res => {
        return res.find(img => img.$key === val);
      });

      prodImages.subscribe(res => {
        console.log("Selected Images:");
        console.log(this.selectedImages);
        const existingElm = this.selectedImages.find(
          img => img.$key === res.$key
        );
        console.log(existingElm);
        if (!existingElm) {
          console.log(res);
          this.selectedImages.push(res as IProductImage);
        }
      });
    }
  }
  removeSelectedFeature(val) {
    const existingElmIndex = this.selectedFeatures.findIndex(
      ftr => ftr.$key === val
    );
    if (existingElmIndex >= 0) {
      this.selectedFeatures.splice(existingElmIndex, 1);
    }
  }

  removeSelectedImage(val) {
    const existingElmIndex = this.selectedImages.findIndex(
      img => img.$key === val
    );
    if (existingElmIndex >= 0) {
      this.selectedImages.splice(existingElmIndex, 1);
    }
  }

  priceInfoChanged(val: string) {
    const pPegX = /^[1-9][0-9]*(?:\.\d*)?$/g;
    if (pPegX.test(val)) {
      const dtRegX = /^0\.\d{1,3}$/g;
      if (dtRegX.test(this.productDetails.discount.toString())) {
        this.productDetails.discountPrice =
          this.productDetails.price -
          this.productDetails.discount * this.productDetails.price;
      } else {
        this.productDetails.discountPrice = this.productDetails.price;
      }

      if (dtRegX.test(this.productDetails.taxPer.toString())) {
        this.productDetails.finalPrice =
          this.productDetails.discountPrice +
          this.productDetails.taxPer * this.productDetails.discountPrice;
      } else {
        this.productDetails.finalPrice = this.productDetails.discountPrice;
      }
    }
  }

  discountChanged(val: string) {
    const regX = /^0\.\d{1,3}$/g;
    if (regX.test(val)) {
      this.productDetails.discountPrice =
        this.productDetails.price -
        this.productDetails.discount * this.productDetails.price;
      this.productDetails.finalPrice = this.productDetails.discountPrice;
    } else {
      this.productDetails.discountPrice = this.productDetails.price;
      this.productDetails.finalPrice = this.productDetails.discountPrice;
    }
  }

  taxChanged(val: string) {
    const regX = /^0\.\d{1,3}$/g;
    if (regX.test(val)) {
      this.productDetails.finalPrice =
        this.productDetails.discountPrice +
        this.productDetails.taxPer * this.productDetails.discountPrice;
    } else {
      this.productDetails.finalPrice = this.productDetails.discountPrice;
    }
  }

  childOptionChanged(val: string) {
    console.log(val);
    this.productDetails.children = 0;
    this.productDetails.childPriceFactor = 0.0;
  }
  back() {
    this.router.navigate(['/dashboard/productlist']);
  }
}
