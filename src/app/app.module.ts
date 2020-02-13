import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListComponent } from "./list/list.component";
import { DataService } from "./data.service";
import { ListDetailComponent } from "./list-detail/list-detail.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "lists", component: ListComponent },
      { path: "list/:name", component: ListDetailComponent }
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
