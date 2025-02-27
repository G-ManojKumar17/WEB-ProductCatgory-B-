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

  constructor(private ProductService: ProductService, private categoriesServices: CategoriesService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  //updating product data
  updateProducts(data: NgForm) {
    // console.log(updateProduct);
    // console.log("your data",data.value)
    this.updateProduct.p_id = data.value.p_id;
    this.updateProduct.p_name = data.value.p_name;
    this.updateProduct.c_id = data.value.c_id;
    let x = this.categories.find((el) => el.c_id == data.value.c_id)
    this.updateProduct.c_name = x?.c_name;

    // console.log(x)
    this.ProductService.updateProducts(this.updateProduct).subscribe(() => {
      // console.log("Data Updated");  //debigging
      this.loadProducts();
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
  loadProducts(): void {
    this.ProductService.getProducts().subscribe((data) => {
      // console.log("API response:", data)
      this.products = data;
    });
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
      this.loadProducts();
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
      this.loadProducts();
    });

  }

  page: number = 1;
  itemsPerPage: number = 10;
}
