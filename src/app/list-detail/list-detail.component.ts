import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  list=[];
  listName='';
  newMovie = this.formBuilder.group({
    movie: new FormControl('')
  });

  constructor(private data: DataService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
   this.listName = this.route.snapshot.params.id;
    this.data.cast.subscribe(data => this.list = data.filter(list => list.name === this.listName));
  }

  onSubmit(){
    console.log(this.newMovie.value);
    this.list[0].movies.push({name:this.newMovie.value['movie'], watched: false, rating: null});
    this.newMovie.reset();
  }

  onAddMovie(movieName: string) {
   this.list[0].movies.push(movieName);
    }

}
