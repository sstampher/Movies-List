import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  lists=[];
  list=[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.cast.subscribe(data => this.lists = data);
    this.data.cast.subscribe(data => this.list = data.filter(list => list.name === 'o'));
  }

 

  onAddMovie(movieName: string) {
   this.list[0].movies.push(movieName);
   
    }
      
  
  //   this.values[0].movies.push(value);
    
  // }

}
