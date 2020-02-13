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

  onCreateList(listName: string, e) {
    // make unique
    this.lists.push({ name: listName, movies: [] });
    e.preventDefault();
    console.log(this.lists);
    this.data.updateLists(this.lists);
  }

  onSubmit() {
    console.log(this.newList.value);
    this.lists.push({ name: this.newList.value["name"], movies: [] });
    this.newList.reset();
  }

  onDeleteList(listName: string) {
    let newList = this.lists.filter(list => list.name !== listName);
    this.data.updateLists(newList);
  }

  private uniqueNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean | null } => {
      for (let i = 0; i < this.lists.length; i++) {
        console.log(this.lists[i].name, control);
        if (control.value === this.lists[i].name) {
          return { nameAlreadyExists: true };
        }
      }
      return null;
    };
  }
}
