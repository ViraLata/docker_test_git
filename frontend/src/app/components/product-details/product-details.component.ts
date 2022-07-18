import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false;
  
  @Input() currentProduct: Product = {
    name_product: '',
    description: '',
    price: 0
  };

  message = '';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      console.log('working on')
      this.message = '';
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }

  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePrice(price_val: number): void {
    const data = {
      title: this.currentProduct.name_product,
      description: this.currentProduct.description,
      price: price_val
    };
    this.message = '';
    this.productService.update(this.currentProduct.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentProduct.price = price_val;
          this.message = res.message ? res.message : 'The price was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  updateProduct(): void {
    this.message = '';
    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.message = res.message ? res.message : 'This product was updated successfully!';
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
  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/product']);
        },
        error: (e) => console.error(e)
      });
  }



}
