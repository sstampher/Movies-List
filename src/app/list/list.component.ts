import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import {
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  lists = [];
  newList = this.formBuilder.group({
    name: new FormControl("", [Validators.required, this.uniqueNameValidator()])
  });

  constructor(private data: DataService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.data.cast.subscribe(data => (this.lists = data));
  }

  /*........ Event Handling Functions ........*/

  onCreateList(listName: string) {
    this.lists.push({ name: listName, movies: [] });
    this.data.updateLists(this.lists);
  }

  onSubmit() {
    this.lists.push({ name: this.newList.value["name"], movies: [] });
    this.newList.reset();
  }

  onDeleteList(listName: string) {
    let newList = this.lists.filter(list => list.name !== listName);
    this.data.updateLists(newList);
  }

  /*........ Counting Functions ........*/

  movieCounter(listName: string) {
    let list = this.lists.filter(list => list.name === listName);
    let listLength = list[0].movies.length;
    return listLength;
  }

  watchedCounter(listName: string) {
    let list = this.lists.filter(list => list.name === listName);
    let watchedCount = list[0].movies
      ? list[0].movies.reduce(
          (count, movie) =>
            movie.watched ? (count = count + 1) : (count = count),
          0
        )
      : 0;
    return watchedCount;
  }

  /*........ Form Validation Functions ........*/

  private uniqueNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean | null } => {
      for (let i = 0; i < this.lists.length; i++) {
        if (control.value === this.lists[i].name) {
          return { nameAlreadyExists: true };
        }
      }
      return null;
    };
  }
}
