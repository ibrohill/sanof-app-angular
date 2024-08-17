import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchVoyagesComponent } from './search-voyages/search-voyages.component';
import { VoyagesListComponent } from './voyages-list/voyages-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddVoyageComponent } from './add-voyage/add-voyage.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchVoyagesComponent,
    VoyagesListComponent,
    ReservationComponent,
    AddVoyageComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'recherche', component: SearchVoyagesComponent},
      {path: 'liste-voyage', component: VoyagesListComponent},
      {path: 'reservation/:id', component: ReservationComponent},
      { path: 'ajouter-voyage', component: AddVoyageComponent },
      { path: 'resultatRecherche', component: SearchResultsComponent },
      {path: '', redirectTo: '/recherche', pathMatch: 'full'},
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
