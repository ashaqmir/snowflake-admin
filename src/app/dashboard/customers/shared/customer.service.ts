import { Injectable } from '@angular/core';
import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase
} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IProfile } from '../../../models/profile';
@Injectable()
export class CustomerService {
  private basePath = '/Profiles';
  profilesRef: AngularFireList<IProfile>;
  customers: Observable<IProfile[]>;

  constructor(private db: AngularFireDatabase) {
    this.profilesRef = db.list(this.basePath);
  }

  // Return an observable list of products
  getCustomerList(): Observable<IProfile[]> {
    return this.profilesRef.snapshotChanges().map(arr => {
      return arr.map(snap =>
        Object.assign(snap.payload.val(), { $key: snap.key })
      );
    });
  }

  // Return a single observable item
  getProfile(key: string): Observable<IProfile | null> {
    const profilePath = `${this.basePath}/${key}`;
    const profile = this.db
      .object(profilePath)
      .valueChanges() as Observable<IProfile | null>;
    return profile;
  }

  // Update an exisiting product
  updateProfile(key: string, value: any): void {
    this.profilesRef.update(key, value);
  }

  // Deletes a single product
  deleteProfile(key: string): void {
    this.profilesRef.remove(key);
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
