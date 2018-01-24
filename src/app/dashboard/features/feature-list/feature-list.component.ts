import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FeatureService } from '../shared/feature.service';
import { Router } from '@angular/router';
import { IFeature } from '../../../models/feature';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent implements OnInit {
  features: Observable<IFeature[]>;

  constructor(private featureSvc: FeatureService,
    private router: Router) {
    this.features = this.featureSvc.getFeatureList();
  }

  ngOnInit() {
  }

  addProduct() {
    this.router.navigate(['/dashboard/addfeature/new']);
  }
}
