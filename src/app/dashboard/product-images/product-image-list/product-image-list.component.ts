import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-image-list',
  templateUrl: './product-image-list.component.html',
  styleUrls: ['./product-image-list.component.css']
})
export class ProductImageListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addProductImage() {
    this.router.navigate(['/dashboard/addproductimage/new']);
  }
}
