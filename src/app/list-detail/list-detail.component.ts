import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  list=[];
  listName='';

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.listName = this.route.snapshot.params.id;
    this.data.cast.subscribe(data => this.list = data.filter(list => list.name === this.listName));
  }

 

  onAddMovie(movieName: string) {
   this.list[0].movies.push(movieName);
   
    }
      
  
  //   this.values[0].movies.push(value);
    
  // }

}
