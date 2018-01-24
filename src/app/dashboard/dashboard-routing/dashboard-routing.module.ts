import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { LandingComponent } from '../landing/landing.component';
import { AuthGuard } from '../../core/auth.guard';
import { ProductFormComponent } from '../products/product-form/product-form.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { FeatureListComponent } from '../features/feature-list/feature-list.component';
import { FeatureFormComponent } from '../features/feature-form/feature-form.component';


const childRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
      },
      {
        path: 'landing',
        component: LandingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'productlist',
        component: ProductListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'addproduct/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'editproduct/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'orderlist',
        component: OrderListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'featurelist',
        component: FeatureListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'addfeature/new',
        component: FeatureFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'aditfeature/:id',
        component: FeatureFormComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
