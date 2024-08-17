import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoyagesService } from '../services/voyages.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CityService } from "../services/city.service";

@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html',
  styleUrls: ['./add-voyage.component.css']
})
export class AddVoyageComponent implements OnInit {
  voyageForm: FormGroup;
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private voyagesService: VoyagesService,
    private router: Router,
    private cityService: CityService
  ) {
    this.voyageForm = this.fb.group({
      depart: ['', Validators.required],
      arrivee: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  onSubmit(): void {
    if (this.voyageForm.valid) {
      this.voyagesService.ajouterVoyage(this.voyageForm.value).subscribe({
        next: (response) => {
          console.log('Voyage ajouté avec succès:', response);
          Swal.fire('Succès', 'Voyage ajouté avec succès', 'success');
          this.router.navigate(['/liste-voyage']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du voyage:', error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du voyage', 'error');
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

}

