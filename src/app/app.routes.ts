import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { PriceComponent } from './pages/price.component';
import { CatalogComponent } from './pages/catalog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'price', component: PriceComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '**', redirectTo: '' },
];
