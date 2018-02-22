import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { IProfile } from '../../../models/profile';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Observable<IProfile[]>;
  singleCustomer: IProfile;
  customerPhone: string;
  customerEmail: string;
  customerKey: string;
  single = false;
  constructor(
    private customerSvc: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const key = this.route.params.subscribe(params => {
      this.customerKey = params['id'];
      console.log(this.customerKey);
      if (this.customerKey) {
        this.customerSvc.getProfile(this.customerKey).take(1).do(cstmr => {
          this.singleCustomer = cstmr;
          this.single = true;
        }).subscribe();
      } else {
        this.customers = this.customerSvc.getCustomerList();
        this.single = false;
      }
    });

  }

  clearFilter() {}

  search() {}
}
