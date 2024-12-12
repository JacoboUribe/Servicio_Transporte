import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-product-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.list().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(() => {
          this.getProducts();
          Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
        });
      }
    });
  }

  createProduct() {
    this.router.navigate(["products/create"]);
  }

  viewProduct(id: number) {
    this.router.navigate(["products/view", id]);
  }

  updateProduct(id: number) {
    this.router.navigate(["products/update", id]);
  }
}
