import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

@Component({
  selector: "app-list-detail",
  templateUrl: "./list-detail.component.html",
  styleUrls: ["./list-detail.component.scss"]
})
export class ListDetailComponent implements OnInit {
  list = [];
  listName = "";
  edit = false;

  // consider consolidating repetitive formBuilders
  newMovie = this.formBuilder.group({
    movie: new FormControl("", Validators.required,
      this.uniqueNameValidator()
    )
  });
  editMovie = this.formBuilder.group({
    movie: new FormControl("", Validators.required)
  });

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.listName = this.route.snapshot.params.name;
    this.data.cast.subscribe(
      data => (this.list = data.filter(list => list.name === this.listName))
    );
  }

  onSubmit() {
    this.list[0].movies.push({
      name: this.newMovie.value["movie"],
      watched: false,
      edit: false
    });
    this.newMovie.reset();
  }

  onAddMovie(movieName: string) {
    this.list[0].movies.push(movieName);
  }

  onDeleteMovie(movieName: string) {
    let updatedMoviesList = this.list[0].movies.filter(
      movie => movie.name !== movieName
    );
    this.list[0].movies = updatedMoviesList;
  }

  onEditMovie() {
    this.edit = !this.edit;
  }

  onCheck(movieName: string) {
    let movie = this.list[0].movies.filter(movie => movie.name === movieName);
    movie[0].watched = !movie[0].watched;
  }

  onSubmitEdit(movieName: string) {
    let movie = this.list[0].movies.filter(movie => movie.name === movieName);
    movie[0].name = this.editMovie.value["movie"];
    this.edit = !this.edit;
  }

  checkIfNameExists(name: string): Observable<boolean> {
    console.log(this.list[0].movies);
    let findName = this.list[0].movies.filter(movie => movie.name === name);
    return of(findName[0]).pipe(delay(100));
  }

  uniqueNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfNameExists(control.value).pipe(
        map(res => {
          return res ? { nameAlreadyExists: true } : null;
        })
      );
    };
  }
}
