import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {

  data = new BehaviorSubject([]);
  cast = this.data.asObservable();

  constructor() {}

  getLists() {
    return this.cast;
  }

  updateLists(list) {
    this.data.next(list);
  }

}
