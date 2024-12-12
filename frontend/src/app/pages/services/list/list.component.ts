import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Service } from "src/app/models/service.model";
import { ServiceService } from "src/app/services/service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-service-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.serviceService.list().subscribe((data) => {
      this.services = data;
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
        this.serviceService.delete(id).subscribe(() => {
          this.list();
          Swal.fire("Eliminado", "El servicio se ha eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/services/create"]);
  }

  view(id: number) {
    this.router.navigate(["/services/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/services/update", id]);
  }
}
