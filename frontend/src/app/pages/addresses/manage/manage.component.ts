import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { Addreesseservice } from "src/app/services/address.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-address-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  address: Address;
  // mode = 1 ---> view, mode = 2 ---> create, mode = 3 ---> update
  mode: number;

  theFormGroup: FormGroup; // Reglas de validación
  trySend: boolean; // Indica si se intentó enviar el formulario con errores

  constructor(
    private addressService: Addreesseservice,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.address = { id: 0, address_name: "", address: "", references: "", neighborhood: "" };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.address.id = this.activateRoute.snapshot.params.id;
      this.getAddress(this.address.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      address_name: ["", [Validators.required, Validators.minLength(2)]],
      address: ["", [Validators.required, Validators.minLength(5)]],
      references: ["", [Validators.maxLength(255)]],
      neighborhood: ["", [Validators.required, Validators.minLength(2)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getAddress(id: number) {
    this.addressService.view(id).subscribe((data) => {
      this.address = data;
      this.theFormGroup.patchValue(this.address);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.addressService.create(this.theFormGroup.value).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado la dirección correctamente", "success");
      this.router.navigate(["/addresses/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }
  
    this.addressService.update(this.address).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado la dirección correctamente", "success");
      this.router.navigate(["/addresses/list"]);
    });
  }
}
