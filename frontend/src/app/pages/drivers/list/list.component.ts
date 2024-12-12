import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Driver } from "src/app/models/driver.model";
import { DriverService } from "src/app/services/driver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-driver-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  drivers: Driver[];

  constructor(private driverService: DriverService, private router: Router) {
    this.drivers = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.driverService.list().subscribe((data) => {
      this.drivers = data;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.driverService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Eliminado", "Se ha eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/drivers/create"]);
  }

  view(id: number) {
    this.router.navigate(["/drivers/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/drivers/update", id]);
  }
}
