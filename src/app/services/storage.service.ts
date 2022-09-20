import { Injectable } from '@angular/core';
import { userKey } from '../core/constants/authconstants';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  setUserData(userData: any) {
    localStorage.setItem(userKey, JSON.stringify(userData));
  }
  getUserData() {
    return JSON.parse(localStorage.getItem(userKey) as string);
  }
  clearStorage() {
    localStorage.clear();
  }
  removeStorageelement(name: string) {
    localStorage.removeItem(name);
  }
}
