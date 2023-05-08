import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventTypes } from 'src/app/core/models/event-types';
import { ToastEvent } from 'src/app/core/models/toast-event';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showMessage(title: string, message: string, type: EventTypes) {
    this._toastEvents.next({
      message,
      title,
      type,
    });
  }
}