import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListComponent } from "./list/list.component";
import { DataService } from "./data.service";
import { ListDetailComponent } from "./list-detail/list-detail.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MoviesApiService } from "./movies-api.service";

@NgModule({
  declarations: [AppComponent, ListComponent, ListDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: ListComponent },
      { path: "lists", component: ListComponent },
      { path: "list/:name", component: ListDetailComponent }
    ])
  ],
  providers: [DataService, MoviesApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
