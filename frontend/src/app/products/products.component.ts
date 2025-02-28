import { Component } from '@angular/core';
import { Products } from '../models/products';
import { Categories } from '../models/categories';
import { ProductService } from '../services/product.service';
import { CategoriesService } from '../services/categories.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  categories: Categories[] = [];
  category: any = {
    c_id: 0,
    c_name: "",
  };
  products: Products[] = [];

  newProducts: Products = {
    p_id: 0, p_name: '', c_id: 0,
    c_name: ''
  }

  updateProduct: any = {
    p_id: 0,
    p_name: "",
    c_id: 0,
    c_name: ""
  }

  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;  // Items per page

  constructor(private ProductService: ProductService, private categoriesServices: CategoriesService) { }

  ngOnInit(): void {
    this.loadProducts(this.currentPage);
    this.loadCategories();
  }

  //updating product data
  updateProducts(data: NgForm) {
    // console.log(updateProduct);
    // console.log("your data",data.value)
    this.updateProduct.p_id = data.value.p_id;
    let default_p = this.products.find((el) => el.p_id == data.value.p_id)
    this.updateProduct.p_name = data.value.p_name || default_p?.p_name;
    this.updateProduct.c_id = data.value.c_id || default_p?.c_id;
    let x = this.categories.find((el) => el.c_id == data.value.c_id)
    this.updateProduct.c_name = x?.c_name;

    // console.log(x)
    this.ProductService.updateProducts(this.updateProduct).subscribe(() => {
      // console.log("Data Updated");  //debigging
      this.loadProducts(this.currentPage);
    })
    data.resetForm();
  }

  // to get catogery list in options
  loadCategories(): void {
    this.categoriesServices.getCategories().subscribe((data) => {
      // console.log("API response:", data)
      this.categories = data;
    });
  }

  //to get product list
  loadProducts(page: number) {
    this.ProductService.getProducts(page, this.limit).subscribe(response => {
      this.products = response.products;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts(page);
    }
  }

  //to add product 
  addProducts(data: NgForm) {

    // console.log(data.value) //debugging
    this.newProducts.c_id = data.value.c_id;
    this.newProducts.p_name = data.value.p_name;
    if (!this.newProducts.c_id) {
      alert("Please Select Category")
      return
    }

    let x = this.categories.find((el) => el.c_id == data.value.c_id)
    // console.log(x);  //debugging
    this.newProducts.c_name = x?.c_name;
    // console.log("Add new product", this.newProducts) //debugging

    this.ProductService.addProducts(this.newProducts).subscribe(() => {
      // console.log("API response: (Data Added)");   //debugging
      this.loadProducts(this.currentPage);
      // console.log(this.products)     //debugging

    }
    );
    data.resetForm();
  }



  //delete product
  deleteProducts(p_id: Number) {
    // console.log("delete", p_id)   debugging
    this.ProductService.deleteProducts(p_id).subscribe(() => {
      // console.log("Data Deleted")   debugging
      this.loadProducts(this.currentPage);
    });

  }

}
