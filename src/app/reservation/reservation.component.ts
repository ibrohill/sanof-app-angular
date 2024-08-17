import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  paymentForm: FormGroup;
  voyageId!: number;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      voyageur_id: [null, Validators.required],
      dateReservation: ['', Validators.required],
      statut: ['En attente', Validators.required],
      montantTotal: [0, Validators.required],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.voyageId = +id;
    } else {
      console.error('Voyage ID is not found');
      // Vous pouvez rediriger l'utilisateur ou afficher un message d'erreur ici
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid && this.paymentForm.valid) {
      const reservationData = this.reservationForm.value;
      this.reservationService.createReservation(this.voyageId, reservationData).subscribe(
        response => {
          // Traitement après la réservation, comme redirection ou message
          Swal.fire('Réservation réussie!', 'Votre réservation a été effectuée avec succès.', 'success');
          this.router.navigate(['/']);
        },
        error => {
          // Gestion des erreurs
          Swal.fire('Erreur', 'Une erreur est survenue lors de la réservation.', 'error');
        }
      );
    } else {
      Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs.', 'error');
    }
  }
}
