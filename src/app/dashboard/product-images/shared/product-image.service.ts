import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Promise, resolve } from 'q';
import { IFeature } from '../../../models/feature';


@Injectable()
export class ProductImageService {

  private basePath = '/Features';
  featuresRef: AngularFireList<IFeature>;

  constructor(private db: AngularFireDatabase) {
    this.featuresRef = db.list(this.basePath);
  }

  // Return an observable list of products
  getFeatureList(): Observable<IFeature[]> {
    return this.featuresRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }));
    });
  }

  // Return a single observable item
  getFeature(key: string): Observable<IFeature | null> {
    const featurePath = `${this.basePath}/${key}`;
    const feature = this.db.object(featurePath).valueChanges() as Observable<IFeature | null>;
    return feature;
  }

  // Create a brand new product
  createFeature(feature: IFeature): PromiseLike<any> {
    return this.featuresRef.push(feature).then(prod => {
      if (prod) {
        return resolve(prod);
      }
    });
  }

  // Update an exisiting product
  updateFeature(key: string, value: any): void {
    this.featuresRef.update(key, value);
  }

  // Deletes a single product
  deleteFeature(key: string): void {
    this.featuresRef.remove(key);
  }

  // Deletes the entire list of products
  deleteAll(): void {
    this.featuresRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
