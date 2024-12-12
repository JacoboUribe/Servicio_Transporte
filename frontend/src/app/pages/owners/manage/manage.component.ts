import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Owner } from "src/app/models/owner.model";
import { OwnerService } from "src/app/services/owner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-owner-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  owner: Owner;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private ownerService: OwnerService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.owner = { id: 0, phone: "", date_of_acquisition: new Date(), driver_id: 0, user_id: 0 };
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
      this.owner.id = this.activateRoute.snapshot.params.id;
      this.getOwner(this.owner.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      phone: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      date_of_acquisition: ["", [Validators.required]],
      driver_id: [0, [Validators.required, Validators.min(1)]],
      user_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getOwner(id: number) {
    this.ownerService.view(id).subscribe((data) => {
      this.owner = data;
      this.theFormGroup.patchValue(this.owner);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.ownerService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "Se ha creado el propietario correctamente", "success");
      this.router.navigate(["/owners/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.ownerService.update(this.owner).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado el propietario correctamente", "success");
      this.router.navigate(["/owners/list"]);
    });
  }
}
