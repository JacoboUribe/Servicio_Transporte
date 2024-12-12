import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { VehicleOwner } from "src/app/models/vehicle-owner.model";
import { VehicleOwnerService } from "src/app/services/vehicle-owner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-vehicleowner-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  vehicleOwners: VehicleOwner[] = [];

  constructor(private vehicleOwnerService: VehicleOwnerService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.vehicleOwnerService.list().subscribe((data) => {
      this.vehicleOwners = data;
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
        this.vehicleOwnerService.delete(id).subscribe(() => {
          this.list();
          Swal.fire("Eliminado", "El registro ha sido eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/vehicleowners/create"]);
  }

  view(id: number) {
    this.router.navigate(["/vehicleowners/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/vehicleowners/update", id]);
  }
}
