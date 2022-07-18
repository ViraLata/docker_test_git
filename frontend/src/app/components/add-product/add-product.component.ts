import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = {
    name_product: '',
    description: '',
    price: 0
  };
  submitted = false;
  message = '';
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.message = '';
  }
  saveProduct(): void {
    const data = {
      name_product: this.product.name_product,
      description: this.product.description,
      price: this.product.price
    };
    this.message = '';
    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: error => { 
          console.error(error); 
          this.message = error.status; 
          if (error.status === 422) {
            this.message = "Please check the values of the form!";
          }
        }
      });
  }
  newProduct(): void {
    this.submitted = false;
    this.product = {
      name_product: '',
      description: '',
      price: 0
    };
  }

}
