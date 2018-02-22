import { Injectable, EventEmitter } from '@angular/core';
import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase
} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { IBannerImage } from '../../../models/banner-image';

@Injectable()
export class AppBannerImageService {
  uploadChange: EventEmitter<string> = new EventEmitter();

  basePath = 'AppBannerImages';
  productImages: Observable<IBannerImage[]>;

  constructor(private db: AngularFireDatabase) {}

  getBannerImages() {
    this.productImages = this.db
      .list(this.basePath)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const $key = a.payload.key;
          return { $key, ...data };
        });
      });
    return this.productImages;
  }

  deleteBannerImage(productImage: IBannerImage) {
    this.deleteFileData(productImage.$key)
      .then(() => {
        this.deleteFileStorage(productImage.title);
      })
      .catch(error => console.log(error));
  }

  pushBannerImage(productImage: IBannerImage) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${productImage.file.name}`)
      .put(productImage.file);

    this.emitUploadEvent('STARTED');
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        productImage.progress =
          uploadTask.snapshot.bytesTransferred /
          uploadTask.snapshot.bytesTransferred *
          100;
      },
      error => {
        // upload failed
        console.log(error);
        this.emitUploadEvent('ERROR');
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          productImage.url = uploadTask.snapshot.downloadURL;
          productImage.name = productImage.file.name;
          this.saveFileData(productImage).then(data => {
            this.emitUploadEvent('COMPLETED');
          });
        } else {
          console.error('No download URL!');
        }
      }
    );
  }

  private saveFileData(productImage: IBannerImage): PromiseLike<any> {
    return this.db.list(`${this.basePath}/`).push(productImage);
  }

  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

  emitUploadEvent(status) {
    this.uploadChange.emit(status);
  }
  getChangeEmitter() {
    return this.uploadChange;
  }
}
