import { Component, OnInit } from '@angular/core';
import { Categories } from '../models/categories';
import { CategoriesService } from '../services/categories.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Categories[] = [];
  newCategory: Categories = {c_id: 0, c_name: ''}
  uC: Categories = {c_id: 0, c_name: ''}
  constructor(private categoriesServices: CategoriesService) { }

  ngOnInit(): void{
    this.loadCategories();
  }

  loadCategories(): void{
    this.categoriesServices.getCategories().subscribe((data)=>{
      // console.log("API response:", data)   //debugging
      this.categories = data;
    });
  }

  addCategories(data: NgForm) {

    this.newCategory.c_name = data.value
    this.categoriesServices.addCategories(this.newCategory.c_name).subscribe(()=>{
      // console.log("API response: (Data Added)");   //debugging
      this.loadCategories();
    }
    );
  }

  updateCategories(data: NgForm){
    
    // console.log(this.uC.c_name);
    this.uC.c_id = data.value.c_id;
    this.uC.c_name = data.value.c_name;
    this.categoriesServices.updateCategories(this.uC.c_id, this.uC.c_name).subscribe(()=>{
      // console.log("Data Updated");   //debigging
      this.loadCategories();
    })
  }


  deleteCategories(c_id: Number) {
    // console.log(c_id)    //debugging
    this.categoriesServices.deleteCategories(c_id).subscribe(()=>{
      // console.log("Data Deleted")    //debugging
    this.loadCategories();
    });
    
  }

}
