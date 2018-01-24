import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent, SideMenuComponent,
  ControlSidebarComponent, FooterComponent } from './shared/shared';
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ProductModule,
    OrderModule,
    FeatureModule
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
    OrderListComponent,
    OrderDetailsComponent,
    FeatureListComponent,
    FeatureDetailsComponent,
    FeatureFormComponent
  ]
})
export class DashboardModule { }
