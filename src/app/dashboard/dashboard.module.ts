import { ProductImageModule } from './product-images/shared/product-image.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {
  HeaderComponent,
  SideMenuComponent,
  ControlSidebarComponent,
  FooterComponent
} from './shared/shared';
import { LandingComponent } from './landing/landing.component';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductModule } from './products/shared/product.module';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderModule } from './orders/shared/order.module';
import { FeatureListComponent } from './features/feature-list/feature-list.component';
import { FeatureDetailsComponent } from './features/feature-details/feature-details.component';
import { FeatureFormComponent } from './features/feature-form/feature-form.component';
import { FeatureModule } from './features/shared/feature.module';
import { ProductImageFormComponent } from './product-images/product-image-form/product-image-form.component';
import { ProductImageListComponent } from './product-images/product-image-list/product-image-list.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomerModule } from './customers/shared/customer.module';
import { AppBannerImageModule } from './app-banner-images/shared/app-banner-image.module';
import { AppBannerImageListComponent } from './app-banner-images/app-banner-image-list/app-banner-image-list.component';
import { AppBannerImageFormComponent } from './app-banner-images/app-banner-image-form/app-banner-image-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ProductModule,
    OrderModule,
    FeatureModule,
    ProductImageModule,
    CustomerModule,
    AppBannerImageModule
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideMenuComponent,
    ControlSidebarComponent,
    FooterComponent,
    LandingComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductDetailsComponent,
    FeatureListComponent,
    FeatureDetailsComponent,
    FeatureFormComponent,
    ProductImageFormComponent,
    ProductImageListComponent,
    OrderListComponent,
    OrderDetailsComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    LoadingSpinnerComponent,
    AppBannerImageListComponent,
    AppBannerImageFormComponent
  ]
})
export class DashboardModule {}
