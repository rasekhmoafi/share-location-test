import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get localStorage(): Storage {
    return localStorage;
  }
}
