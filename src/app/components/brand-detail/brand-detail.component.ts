import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css'],
})
export class BrandDetailComponent implements OnInit {
  brands: Brand[]; 
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
