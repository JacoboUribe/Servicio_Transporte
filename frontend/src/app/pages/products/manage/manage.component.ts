import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-product-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  product: Product = {
    product_name: "",
    description: "",
    expiration_date: new Date(),
    lot_id: 0,
    customer_id: 0,
  };
  mode: number = 0;
  formGroup: FormGroup;
  trySend: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      product_name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      expiration_date: ["", [Validators.required]],
      lot_id: [0, [Validators.required, Validators.min(1)]],
      customer_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.productService.view(id).subscribe((data) => {
        this.product = data;
        this.formGroup.patchValue(data);
      });
    }
  }

  create() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    this.productService.create(this.formGroup.value).subscribe(() => {
      Swal.fire("Creado", "El producto ha sido creado exitosamente", "success");
      this.router.navigate(["/products/list"]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    const id = this.product.id!;
    this.productService.update(this.product).subscribe(() => {
      Swal.fire("Actualizado", "El producto ha sido actualizado", "success");
      this.router.navigate(["/products/list"]);
    });
  }
}
