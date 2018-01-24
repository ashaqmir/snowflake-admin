import { Injectable } from '@angular/core';
import { IProfile } from '../models/profile';

@Injectable()
export class AppStateService {

  userProfile: IProfile;

  constructor() { }

  clearState() {
    this.userProfile = null;
  }
}
