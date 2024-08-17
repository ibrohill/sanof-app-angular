import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { SearchVoyagesComponent } from './search-voyages/search-voyages.component';
import { VoyagesListComponent } from './voyages-list/voyages-list.component';
import { AddVoyageComponent } from './add-voyage/add-voyage.component';
import {SearchResultsComponent} from "./search-results/search-results.component";

const routes: Routes = [
  { path: 'reservation/:id', component: ReservationComponent },
  // { path: 'reserver/:id', component: ReservationComponent },
  { path: 'recherche', component: SearchVoyagesComponent },
  { path: 'liste-voyage', component: VoyagesListComponent },
  { path: 'ajouter-voyage', component: AddVoyageComponent },
  { path: 'resultatRecherche', component: SearchResultsComponent },
  { path: '', redirectTo: '/recherche', pathMatch: 'full' },
  { path: '**', redirectTo: '/recherche' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
