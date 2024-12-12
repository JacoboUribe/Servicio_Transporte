import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VehicleDriver } from "src/app/models/vehicle-driver.model";
import { VehicleDriverService } from "src/app/services/vehicle-driver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-vehicledriver-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  vehicleDriver: VehicleDriver = { vehicle_id: 0, driver_id: 0 };
  mode: number = 0;
  formGroup: FormGroup;
  trySend: boolean = false;

  constructor(
    private vehicleDriverService: VehicleDriverService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      vehicle_id: [0, [Validators.required, Validators.min(1)]],
      driver_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.vehicleDriverService.view(id).subscribe((data) => {
        this.vehicleDriver = data;
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
    this.vehicleDriverService.create(this.formGroup.value).subscribe(() => {
      Swal.fire("Creado", "La relación vehículo-conductor ha sido creada correctamente", "success");
      this.router.navigate(["/vehicledrivers/list"]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    const id = this.vehicleDriver.id!;
    this.vehicleDriverService.update(this.vehicleDriver).subscribe(() => {
      Swal.fire("Actualizado", "La relación vehículo-conductor ha sido actualizada", "success");
      this.router.navigate(["/vehicledrivers/list"]);
    });
  }
}
