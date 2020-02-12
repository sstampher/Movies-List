import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 data = new BehaviorSubject([]);
cast=this.data.asObservable();
 

  constructor() { }

  getLists(){
    return this.data.asObservable();
  }

  updateLists(list){
    this.data.next(list);
  }

}
