import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { VehicleDriver } from "src/app/models/vehicle-driver.model";
import { VehicleDriverService } from "src/app/services/vehicle-driver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-vehicledriver-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  vehicleDrivers: VehicleDriver[] = [];

  constructor(private vehicleDriverService: VehicleDriverService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.vehicleDriverService.list().subscribe((data) => {
      this.vehicleDrivers = data;
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
        this.vehicleDriverService.delete(id).subscribe(() => {
          this.list();
          Swal.fire("Eliminado", "El registro ha sido eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/vehicledrivers/create"]);
  }

  view(id: number) {
    this.router.navigate(["/vehicledrivers/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/vehicledrivers/update", id]);
  }
}
