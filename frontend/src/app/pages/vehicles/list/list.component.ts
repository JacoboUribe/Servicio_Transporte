import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Vehicle } from "src/app/models/vehicle.model";
import { vehicleService } from "src/app/services/vehicle.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: vehicleService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.vehicleService.list().subscribe((data) => {
      this.vehicles = data;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro que desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.delete(id).subscribe(() => {
          this.list();
          Swal.fire("Eliminado", "El registro ha sido eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/vehicles/create"]);
  }

  view(id: number) {
    this.router.navigate(["/vehicles/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/vehicles/update", id]);
  }
}
