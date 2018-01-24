import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IFeature } from '../../../models/feature';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.css']
})
export class FeatureDetailsComponent implements OnInit {

  @Input() feature: IFeature;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  editFeature() {
    this.router.navigate(['/dashboard/aditfeature', this.feature.$key]);
  }
}
