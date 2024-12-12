import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-customer-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  customer: Customer;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private customerService: CustomerService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.customer = { id: 0, phone_number: "", number_orders: 0 };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.activateRoute.snapshot.params.id) {
      this.customer.id = this.activateRoute.snapshot.params.id;
      this.getCustomer(this.customer.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      phone_number: ["", [Validators.required, Validators.minLength(10)]],
      number_orders: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getCustomer(id: number) {
    this.customerService.view(id).subscribe((data) => {
      this.customer = data;
      this.theFormGroup.patchValue(this.customer);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.customerService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "Se ha creado el cliente correctamente", "success");
      this.router.navigate(["/customers/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.customerService.update(this.customer).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado el cliente correctamente", "success");
      this.router.navigate(["/customers/list"]);
    });
  }
}
