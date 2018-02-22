import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProfile } from '../../../models/profile';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  @Input() customer: IProfile;
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
