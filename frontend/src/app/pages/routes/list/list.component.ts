import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Route } from "src/app/models/route.model";
import { RouteService } from "src/app/services/route.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-route-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  routes: Route[] = [];

  constructor(private routeService: RouteService, private router: Router) {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    this.routeService.list().subscribe((data) => {
      this.routes = data;
    });
  }

  deleteRoute(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar esta ruta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.routeService.delete(id).subscribe(() => {
          this.getRoutes();
          Swal.fire("Eliminado", "La ruta ha sido eliminada", "success");
        });
      }
    });
  }

  createRoute() {
    this.router.navigate(["routes/create"]);
  }

  viewRoute(id: number) {
    this.router.navigate(["routes/view", id]);
  }

  updateRoute(id: number) {
    this.router.navigate(["routes/update", id]);
  }
}
