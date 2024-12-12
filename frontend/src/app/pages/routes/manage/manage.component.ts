import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Route } from "src/app/models/route.model";
import { RouteService } from "src/app/services/route.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-route-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  route: Route = {
    starting_point: "",
    destination_point: "",
    distance: 0,
    delivery_date: new Date(),
    contract_id: 0,
    vehicle_id: 0,
  };
  mode: number = 0;
  formGroup: FormGroup;
  trySend: boolean = false;

  constructor(
    private routeService: RouteService,
    private routeActivated: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      starting_point: ["", [Validators.required, Validators.minLength(3)]],
      destination_point: ["", [Validators.required, Validators.minLength(3)]],
      distance: [0, [Validators.required, Validators.min(1)]],
      delivery_date: ["", [Validators.required]],
      contract_id: [0, [Validators.required, Validators.min(1)]],
      vehicle_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.routeActivated.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.routeActivated.snapshot.params.id) {
      const id = this.routeActivated.snapshot.params.id;
      this.routeService.view(id).subscribe((data) => {
        this.route = data;
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
    this.routeService.create(this.formGroup.value).subscribe(() => {
      Swal.fire("Creado", "La ruta ha sido creada exitosamente", "success");
      this.router.navigate(["/routes/list"]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    this.routeService.update(this.route).subscribe(() => {
      Swal.fire("Actualizado", "La ruta ha sido actualizada", "success");
      this.router.navigate(["/routes/list"]);
    });
  }
}
