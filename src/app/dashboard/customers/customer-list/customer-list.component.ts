import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { IProfile } from '../../../models/profile';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Observable<IProfile[]>;
  customerPhone: string;
  customerEmail: string;

  constructor(private customerSvc: CustomerService, private router: Router) {
    this.customers = this.customerSvc.getCustomerList();
  }

  ngOnInit() { }
  
  clearFilter() {
    
  }

  search() {
    
  }
}
