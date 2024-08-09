import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FisicoRegistrationComponent } from '../fisico-registration/fisico-registration.component';
import { SearchViewComponent } from '../search-viewFisicos/search-viewFisicos.component';
import { MoralRegistrationComponent } from '../moral-registration/moral-registration.component';
import { SearchViewMoralesComponent } from '../search-viewMorales/search-viewmorales.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true,
  imports: [CommonModule, FisicoRegistrationComponent, SearchViewComponent, MoralRegistrationComponent, SearchViewMoralesComponent]
})
export class WelcomeComponent {
  selectedOption: string | null = null;
  showFisicoForm: boolean = false;
  showMoralForm: boolean = false;
  isFisicoSearchActive: boolean = false;
  isMoralSearchActive: boolean = false;
  showSearchView: boolean = false; // Añade esta línea

  constructor(private router: Router) {}

  selectOption(option: string) {
    this.selectedOption = option;
    this.showFisicoForm = false;
    this.showMoralForm = false;
    this.isFisicoSearchActive = false;
    this.isMoralSearchActive = false;
    this.showSearchView = option === 'busqueda'; // Actualiza esta línea
  }

  showFisicoRegistrationForm() {
    this.showFisicoForm = true;
    this.showMoralForm = false;
    this.showSearchView = false; // Añade esta línea
  }

  showMoralRegistrationForm() {
    this.showMoralForm = true;
    this.showFisicoForm = false;
    this.showSearchView = false; // Añade esta línea
  }

  showFisicoSearchView() {
    this.isFisicoSearchActive = true;
    this.isMoralSearchActive = false;
    this.showSearchView = true; // Actualiza esta línea
    this.showFisicoForm = false;
    this.showMoralForm = false;
  }

  showMoralSearchView() {
    this.isMoralSearchActive = true;
    this.isFisicoSearchActive = false;
    this.showSearchView = true; // Actualiza esta línea
    this.showFisicoForm = false;
    this.showMoralForm = false;
  }

  getTitleForOption(): string {
    if (this.selectedOption === 'registro') {
      return 'Registro de patrones';
    } else if (this.selectedOption === 'busqueda') {
      return 'Búsqueda de beneficiarios';
    }
    return '';
  }

  logout() {
    this.router.navigate(['/']);
  }
}