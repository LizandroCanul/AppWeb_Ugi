import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly STORAGE_KEY_FISICOS = 'beneficiarios_fisicos';
  private readonly STORAGE_KEY_MORALES = 'beneficiarios_morales';
  private itemToEdit: any = null;

  constructor() { }

  private getStorageKey(tipo: 'fisicos' | 'morales'): string {
    return tipo === 'fisicos' ? this.STORAGE_KEY_FISICOS : this.STORAGE_KEY_MORALES;
  }

  saveData(data: any, tipo: 'fisicos' | 'morales') {
    const key = this.getStorageKey(tipo);
    const existingData = this.getData(tipo);
    existingData.push(data);
    sessionStorage.setItem(key, JSON.stringify(existingData));
  }

  getData(tipo: 'fisicos' | 'morales'): any[] {
    const key = this.getStorageKey(tipo);
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  updateData(updatedData: any, tipo: 'fisicos' | 'morales') {
    const key = this.getStorageKey(tipo);
    const existingData = this.getData(tipo);
    const index = existingData.findIndex(item => item.id === updatedData.id);
    if (index !== -1) {
      existingData[index] = updatedData;
      sessionStorage.setItem(key, JSON.stringify(existingData));
    }
  }

  deleteData(index: number, tipo: 'fisicos' | 'morales') {
    const key = this.getStorageKey(tipo);
    const existingData = this.getData(tipo);
    existingData.splice(index, 1);
    sessionStorage.setItem(key, JSON.stringify(existingData));
  }

  setItemToEdit(item: any) {
    this.itemToEdit = item;
  }

  getItemToEdit() {
    return this.itemToEdit;
  }

  clearItemToEdit() {
    this.itemToEdit = null;
  }

  // Método adicional para obtener un elemento por ID
  getItemById(id: string, tipo: 'fisicos' | 'morales'): any | undefined {
    const data = this.getData(tipo);
    return data.find(item => item.id === id);
  }

  // Método para limpiar todos los datos de un tipo específico
  clearAllData(tipo: 'fisicos' | 'morales') {
    const key = this.getStorageKey(tipo);
    sessionStorage.removeItem(key);
  }

  // Método para verificar si existen datos
  hasData(tipo: 'fisicos' | 'morales'): boolean {
    const data = this.getData(tipo);
    return data.length > 0;
  }

  // Método para obtener el número total de registros
  getDataCount(tipo: 'fisicos' | 'morales'): number {
    return this.getData(tipo).length;
  }
}