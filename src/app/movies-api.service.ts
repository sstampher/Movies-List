import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, map, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

 
  constructor(private http: HttpClient) { }

  search(searchQuery: Observable<string>) {
    return searchQuery.pipe(debounceTime(100),distinctUntilChanged(),
      switchMap(query => this.searchMovies(query)));
  }

  searchMovies(searchQuery) {
    return this.http
        .get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=7cbf8fc6`)
        .pipe(map(res => res || []));
  }

}
