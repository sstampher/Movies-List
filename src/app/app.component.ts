import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Movies-List-App';
  values = [];
  
  onCreateList(value: string) {
    this.values.push({name:value, movies:[]});
  }

}