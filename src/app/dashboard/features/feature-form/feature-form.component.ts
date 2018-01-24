import { Component, OnInit, Input } from '@angular/core';
import { FeatureService } from '../shared/feature.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IFeature } from '../../../models/feature';


@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css']
})
export class FeatureFormComponent implements OnInit {

  pageTitle: string;
  featureKey: string;

  currentFeature: IFeature = new IFeature('', '', '', 0, 0.0, false);

  constructor(private featureSvc: FeatureService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const key = this.route.params.subscribe(params => {
      this.featureKey = params['id'];
      console.log(this.featureKey);
      this.pageTitle = this.featureKey ? 'Edit Feature' : 'Add Feature';

      if (!this.featureKey) {
        this.currentFeature = {} as IFeature;
        return;
      }

      this.featureSvc.getFeature(this.featureKey).subscribe(feature => {
        console.log(feature);
        if (feature) {
          this.currentFeature = feature;
        }
      });

    });
  }

  save() {

    if (!this.featureKey) {
      this.featureSvc.createFeature(this.currentFeature).then(prod => {
        this.router.navigate(['/dashboard/featurelist']);
      });
    } else {
      this.featureSvc.updateFeature(this.featureKey, this.currentFeature);
      this.router.navigate(['/dashboard/featurelist']);
    }
    console.log(this.currentFeature);
  }
}
