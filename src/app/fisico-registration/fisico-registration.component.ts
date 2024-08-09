import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-fisico-registration',
  templateUrl: './fisico-registration.component.html',
  styleUrls: ['./fisico-registration.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class FisicoRegistrationComponent {
  formData: any = {
    beneficioOtorgado: '',
    metodoPago: '',
    importeMonetario: '',
    responsable: '',
    curp: '',
    curpDependiente: '',
    edad: null,
    beneficiarioDiscapacidad: 'no'
  };
  showDependentInfo: boolean = false;
  curpError: string = '';
  curpDependienteError: string = '';

  constructor(private dataService: DataService) {}

  checkDependentInfo() {
    this.showDependentInfo = this.formData.edad < 18 || this.formData.beneficiarioDiscapacidad === 'si';
    if (!this.showDependentInfo) {
      // Limpiar los campos del beneficiario dependiente si no se deben mostrar
      this.formData.parentesco = '';
      this.formData.curpDependiente = '';
      this.formData.nombresDependiente = '';
      this.formData.apellidoPaternoDependiente = '';
      this.formData.apellidoMaternoDependiente = '';
      this.formData.domicilioTutor = '';
    }
  }

  onBeneficioOtorgadoChange() {
    if (this.formData.beneficioOtorgado !== 'Monetario') {
      this.formData.metodoPago = 'N/A';
      this.formData.importeMonetario = 'N/A';
    } else {
      // Resetear los campos si se selecciona 'Monetario'
      this.formData.metodoPago = '';
      this.formData.importeMonetario = '';
    }
  }

  isMonetario(): boolean {
    return this.formData.beneficioOtorgado === 'Monetario';
  }

  onImporteMonetarioInput(event: any) {
    if (this.isMonetario()) {
      const input = event.target as HTMLInputElement;
      const sanitized = input.value.replace(/[^0-9,]/g, '');
      input.value = sanitized;
      this.formData.importeMonetario = sanitized;
    }
  }

  onResponsableInput(event: any) {
    const input = event.target as HTMLInputElement;
    const sanitized = input.value.replace(/[^0-9.]/g, '');
    input.value = sanitized;
    this.formData.responsable = sanitized;
  }

  validateCURP(curp: string): boolean {
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;

    if (!curpRegex.test(curp)) {
      return false;
    }

    const year = parseInt(curp.substr(4, 2));
    const month = parseInt(curp.substr(6, 2));
    const day = parseInt(curp.substr(8, 2));

    const currentYear = new Date().getFullYear() % 100;
    const fullYear = year > currentYear ? 1900 + year : 2000 + year;

    const date = new Date(fullYear, month - 1, day);
    if (date.getFullYear() !== fullYear || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return false;
    }

    return true;
  }

  onCURPChange() {
    if (this.formData.curp && this.validateCURP(this.formData.curp)) {
      this.curpError = '';
    } else {
      this.curpError = 'La CURP no es válida';
    }
  }

  onCURPDependienteChange() {
    if (this.formData.curpDependiente && this.validateCURP(this.formData.curpDependiente)) {
      this.curpDependienteError = '';
    } else {
      this.curpDependienteError = 'La CURP dependiente no es válida';
    }
  }

  onSubmit() {
    if (this.validateCURP(this.formData.curp) && 
        (!this.showDependentInfo || this.validateCURP(this.formData.curpDependiente))) {
      console.log('Datos a guardar:', this.formData);
      this.dataService.saveData(this.formData, 'fisicos');
      console.log('Datos guardados');
      this.formData = {
        beneficioOtorgado: '',
        metodoPago: '',
        importeMonetario: '',
        responsable: '',
        curp: '',
        curpDependiente: '',
        edad: null,
        beneficiarioDiscapacidad: 'no'
      };
      this.showDependentInfo = false;
      this.curpError = '';
      this.curpDependienteError = '';
    } else {
      console.log('CURP(s) inválida(s), no se puede enviar el formulario');
      if (!this.validateCURP(this.formData.curp)) {
        this.curpError = 'La CURP no es válida';
      }
      if (this.showDependentInfo && !this.validateCURP(this.formData.curpDependiente)) {
        this.curpDependienteError = 'La CURP dependiente no es válida';
      }
    }
  }
}