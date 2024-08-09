import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-moral-registration',
  templateUrl: './moral-registration.component.html',
  styleUrls: ['./moral-registration.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class MoralRegistrationComponent {
  formData: any = {
    beneficioOtorgado: '',
    metodoPago: '',
    importeMonetario: '',
    responsable: '',
    curp: '',
    rfc: '',
    edad: null,
    beneficiarioDiscapacidad: 'no'
  };
  showDependentInfo: boolean = false;
  curpError: string = 'Ingrese una CURP válida';
  rfcError: string = '';
  rfcType: string = '';

  constructor(private dataService: DataService) {}

   

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
    // Expresión regular para validar el formato de la CURP
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;

    if (!curpRegex.test(curp)) {
      return false;
    }

    // Validación adicional (por ejemplo, verificar que la fecha sea válida)
    const year = parseInt(curp.substr(4, 2));
    const month = parseInt(curp.substr(6, 2));
    const day = parseInt(curp.substr(8, 2));

    // Asumimos que el año es del siglo pasado si es mayor que el año actual
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

  validateRFC(rfc: string): { isValid: boolean; type: string } {
    // Expresión regular para RFC Físico
    const rfcFisicoRegex = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;

    // Expresión regular para RFC Moral
    const rfcMoralRegex = /^[A-Z]{3}\d{6}[A-Z0-9]{3}$/;

    if (rfcFisicoRegex.test(rfc) && rfc.length === 13) {
      return { isValid: true, type: 'Físico' };
    } else if (rfcMoralRegex.test(rfc) && rfc.length === 12) {
      return { isValid: true, type: 'Moral (Empresarial)' };
    }

    return { isValid: false, type: 'Inválido' };
  }

  onRFCChange() {
    const result = this.validateRFC(this.formData.rfc);
    if (!result.isValid) {
      this.rfcError = 'RFC Inválido';
      this.rfcType = '';
    } else {
      this.rfcError = '';
      this.rfcType = result.type;
    }
  }

  onSubmit() {
    const rfcValidation = this.validateRFC(this.formData.rfc);
    if (!rfcValidation.isValid) {
      console.log('RFC inválido, no se puede enviar el formulario');
      return;
    }

    if (this.validateCURP(this.formData.curp)) {
      console.log('Datos a guardar:', this.formData);
      this.dataService.saveData(this.formData, 'morales');
      console.log('Datos guardados');
      this.formData = {
        beneficioOtorgado: '',
        metodoPago: '',
        importeMonetario: '',
        responsable: '',
        curp: '',
        rfc: '',
        edad: null,
        beneficiarioDiscapacidad: 'no'
      }; // Limpiar el formulario
      this.showDependentInfo = false;
      this.curpError = 'Ingrese una CURP válida';
      this.rfcError = '';
      this.rfcType = '';
    } else {
      console.log('CURP inválida, no se puede enviar el formulario');
      this.curpError = 'La CURP no es válida';
    }
  }
}