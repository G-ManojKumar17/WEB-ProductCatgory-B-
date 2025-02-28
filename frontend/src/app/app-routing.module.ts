import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component'
import { CategoriesComponent } from './categories/categories.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: 'product',
    component: ProductsComponent
  },
  {
    path: 'category',
    component: CategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
