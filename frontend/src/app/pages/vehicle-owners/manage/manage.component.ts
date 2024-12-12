import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VehicleOwner } from "src/app/models/vehicle-owner.model";
import { VehicleOwnerService } from "src/app/services/vehicle-owner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-vehicleowner-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  vehicleOwner: VehicleOwner = { date_acquisition: new Date(), vehicle_id: 0, owner_id: 0 };
  mode: number = 0;
  formGroup: FormGroup;
  trySend: boolean = false;

  constructor(
    private vehicleOwnerService: VehicleOwnerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      date_acquisition: ["", [Validators.required]],
      vehicle_id: [0, [Validators.required, Validators.min(1)]],
      owner_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.vehicleOwnerService.view(id).subscribe((data) => {
        this.vehicleOwner = data;
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
    this.vehicleOwnerService.create(this.formGroup.value).subscribe(() => {
      Swal.fire("Creado", "La relación vehículo-propietario ha sido creada correctamente", "success");
      this.router.navigate(["/vehicleowners/list"]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    this.vehicleOwnerService.update(this.vehicleOwner).subscribe(() => {
      Swal.fire("Actualizado", "La relación vehículo-propietario ha sido actualizada", "success");
      this.router.navigate(["/vehicleowners/list"]);
    });
  }
}
