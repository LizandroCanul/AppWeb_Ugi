import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-viewFisicos.component.html',
  styleUrls: ['./search-viewFisicos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchViewComponent implements OnInit {
  allData: any[] = [];
  displayedData: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  editingIndex: number = -1;
  editingItem: any = null;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.allData = this.dataService.getData('fisicos');
    console.log('Datos cargados:', this.allData);
    this.totalPages = Math.ceil(this.allData.length / this.itemsPerPage);
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedData = this.allData.slice(startIndex, endIndex);
    console.log('Datos mostrados:', this.displayedData);
  }

  onSearch() {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.displayedData = this.allData.filter(item => {
        return Object.values(item).some(value => 
          value !== null && 
          value !== undefined && 
          value.toString().toLowerCase().includes(searchTermLower)
        );
      });
    } else {
      this.updateDisplayedData();
    }
  }

  startEditing(index: number) {
    this.editingIndex = index;
    this.editingItem = {...this.displayedData[index]};
  }

  saveEdit() {
    if (this.editingItem) {
      const index = this.allData.findIndex(item => item.id === this.editingItem.id);
      if (index !== -1) {
        this.allData[index] = {...this.editingItem};
        this.dataService.updateData(this.editingItem, 'fisicos');
      }
    }
    this.editingIndex = -1;
    this.editingItem = null;
    this.updateDisplayedData();
  }

  cancelEdit() {
    this.editingIndex = -1;
    this.editingItem = null;
    this.updateDisplayedData();
  }

  deleteItem(index: number) {
    if(confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      this.dataService.deleteData(index, 'fisicos');
      this.loadData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedData();
    }
  }
}