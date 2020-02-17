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
import { Observable, of, Subject } from "rxjs";
import { delay, map } from "rxjs/operators";
import { MoviesApiService } from '../movies-api.service';

@Component({
  selector: "app-list-detail",
  templateUrl: "./list-detail.component.html",
  styleUrls: ["./list-detail.component.scss"]
})

export class ListDetailComponent implements OnInit {
  list = [];
  listName = "";
  searchQuery = new Subject<string>();
  searchResults = [];

  newMovie = this.formBuilder.group({
    movie: new FormControl("", Validators.required,
      this.uniqueNameValidator()
    )
  });
  editMovie = this.formBuilder.group({
    movie: new FormControl("", Validators.required, this.uniqueNameValidator())
  });

  constructor(
    private data: DataService,
    private movies: MoviesApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.movies.search(this.searchQuery)
      .subscribe(results => {
        this.searchResults = results['Search'];
      });
  }

  ngOnInit() {
    this.listName = this.route.snapshot.params.name;
    this.data.cast.subscribe(
      data => (this.list = data.filter(list => list.name === this.listName))
    );
  }

  /*........ Event Handling Functions ........*/

  onSubmitNewMovie() {
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

  onClickEdit(movieName: string) {
    let movie = this.list[0].movies.filter(movie => movie.name === movieName);
    movie[0].edit = !movie[0].edit;
  }

  onCheck(movieName: string) {
    let movie = this.list[0].movies.filter(movie => movie.name === movieName);
    movie[0].watched = !movie[0].watched;
  }

  onSubmitEdit(movieName: string) {
    let movie = this.list[0].movies.filter(movie => movie.name === movieName);
    movie[0].name = this.editMovie.value["movie"];
    movie[0].edit = !movie[0].edit;
  }

  /*........ Form Validation Functions ........*/

  checkIfNameExists(name: string): Observable<boolean> {
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

  /*........ Api Search Functions ........*/

  searchMovies(query: string){
    this.searchQuery.next(query);
  }
}
