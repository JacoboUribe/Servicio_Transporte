import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Vehicle } from "src/app/models/vehicle.model";
import { vehicleService } from "src/app/services/vehicle.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-vehicle-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  vehicle: Vehicle = { license: "", model: "", load_capacity: 0 };
  mode: number = 0;
  formGroup: FormGroup;
  trySend: boolean = false;

  constructor(
    private vehicleService: vehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      license: ["", [Validators.required, Validators.minLength(6)]],
      model: ["", [Validators.required, Validators.minLength(2)]],
      load_capacity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.vehicleService.view(id).subscribe((data) => {
        this.vehicle = data;
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
    this.vehicleService.create(this.formGroup.value).subscribe(() => {
      Swal.fire("Creado", "El vehículo ha sido creado correctamente", "success");
      this.router.navigate(["/vehicles/list"]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    this.vehicleService.update(this.vehicle).subscribe(() => {
      Swal.fire("Actualizado", "El vehículo ha sido actualizado", "success");
      this.router.navigate(["/vehicles/list"]);
    });
  }
}
