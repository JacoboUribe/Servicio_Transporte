import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OrderRoute } from "src/app/models/order-route.model";
import { order_routeservice } from "src/app/services/order-route.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-order-route-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  orderRoutes: OrderRoute[] = [];

  constructor(private orderRouteService: order_routeservice, private router: Router) {}

  ngOnInit(): void {
    this.getOrderRoutes();
  }

  getOrderRoutes() {
    this.orderRouteService.list().subscribe((data) => {
      this.orderRoutes = data;
    });
  }

  deleteOrderRoute(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar esta ruta de pedido",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderRouteService.delete(id).subscribe(() => {
          this.getOrderRoutes();
          Swal.fire("Eliminado", "La ruta de pedido ha sido eliminada", "success");
        });
      }
    });
  }

  createOrderRoute() {
    this.router.navigate(["order-routes/create"]);
  }

  viewOrderRoute(id: number) {
    this.router.navigate(["order-routes/view", id]);
  }

  updateOrderRoute(id: number) {
    this.router.navigate(["order-routes/update", id]);
  }
}
