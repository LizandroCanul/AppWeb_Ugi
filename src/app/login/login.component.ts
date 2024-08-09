import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showLoginForm: boolean = false;
  isContentVisible: boolean = false; // Agregada esta propiedad

  constructor(private authService: AuthService, private router: Router) {}

  toggleLoginForm(): void {
    this.showLoginForm = !this.showLoginForm;
    if (!this.showLoginForm) {
      // Limpiar los campos y el mensaje de error cuando se cierra el formulario
      this.username = '';
      this.password = '';
      this.errorMessage = '';
    }
  }

  toggleContent(): void { // Agregado este método
    this.isContentVisible = !this.isContentVisible;
  }

  onSubmit(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/welcome']);
      this.showLoginForm = false; // Ocultar el formulario después de un login exitoso
    } else {
      this.errorMessage = 'Usuario inválido. Por favor, inténtalo de nuevo.';
    }
  }
}