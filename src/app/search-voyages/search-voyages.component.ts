import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { CityService } from "../services/city.service";

@Component({
  selector: 'app-search-voyages',
  templateUrl: './search-voyages.component.html',
  styleUrls: ['./search-voyages.component.css']
})
export class SearchVoyagesComponent implements OnInit {

  cities: any[] = [];
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cityService: CityService
  ) {
    this.searchForm = this.fb.group({
      depart: [''],
      arrivee: [''],
      date: ['']
    });
  }

  ngOnInit(): void {
    this.getCities(); // Récupérer les villes lors de l'initialisation du composant
  }

  getCities(): void {
    this.cityService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (err) => {
        Swal.fire('Erreur', 'Impossible de récupérer les villes.', 'error');
      }
    });
  }

  onSearch(): void {
    const searchParams = this.searchForm.value;

    if (!searchParams.depart || !searchParams.arrivee || !searchParams.date) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs de recherche.', 'error');
      return;
    }

    this.router.navigate(['/resultatRecherche'], { queryParams: searchParams });
  }
}
