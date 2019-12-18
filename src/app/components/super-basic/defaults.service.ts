import { Injectable } from '@angular/core';

@Injectable()
export class DefaultsService {
  _default = 'Chimichanga';
  getDefault() {
    return this._default;
  }
}
