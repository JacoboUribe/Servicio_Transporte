import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Driver } from "src/app/models/driver.model";
import { DriverService } from "src/app/services/driver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-driver-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  driver: Driver;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private driverService: DriverService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.driver = { id: 0, license_expiration_date: new Date(), license_number: "", contact_phone: "", user_id: 0 };
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
      this.driver.id = this.activateRoute.snapshot.params.id;
      this.getDriver(this.driver.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      license_expiration_date: ["", [Validators.required]],
      license_number: ["", [Validators.required, Validators.minLength(5)]],
      contact_phone: ["", [Validators.required, Validators.minLength(10)]],
      user_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getDriver(id: number) {
    this.driverService.view(id).subscribe((data) => {
      this.driver = data;
      this.theFormGroup.patchValue(this.driver);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.driverService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "Se ha creado el conductor correctamente", "success");
      this.router.navigate(["/drivers/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.driverService.update(this.driver).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado el conductor correctamente", "success");
      this.router.navigate(["/drivers/list"]);
    });
  }
}
