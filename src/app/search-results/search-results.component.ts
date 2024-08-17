import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoyagesService } from '../services/voyages.service';
import { Voyage } from '../models/voyage.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  voyages: Voyage[] = [];
  nombreDePersonnes: number = 1; // Valeur par défaut

  constructor(
    private route: ActivatedRoute,
    private voyagesService: VoyagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.voyagesService.rechercherVoyages({
        depart: params['depart'],
        arrivee: params['arrivee'],
        date: params['date'],
        nombre_de_personnes: params['nombre_de_personnes']
      }).subscribe({
        next: (result) => {
          this.voyages = result;
          if (this.voyages.length === 0) {
            Swal.fire('Aucun voyage trouvé', 'Aucun voyage ne correspond aux critères de recherche.', 'info');
          }
        },
        error: (err) => {
          Swal.fire('Erreur', err, 'error');
        }
      });
    });
  }

  reserver(voyageId: number) {
    this.router.navigate(['/reservation', voyageId]);
  }

  // reserver(voyage: Voyage, nombreDePersonnes: number): void {
  //   if (nombreDePersonnes > voyage.places_disponibles) {
  //     Swal.fire('Erreur', 'Nombre de personnes excède les places disponibles.', 'error');
  //     return;
  //   }
  //
  //   this.voyagesService.reserverVoyage(voyage.id, nombreDePersonnes).subscribe({
  //     next: () => {
  //       Swal.fire('Succès', 'Réservation effectuée avec succès.', 'success');
  //       voyage.places_disponibles -= nombreDePersonnes;
  //     },
  //     error: (err) => {
  //       Swal.fire('Erreur', 'Erreur lors de la réservation.', 'error');
  //     }
  //   });
  // }
}
