import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRoute } from 'src/app/models/order-route.model';
import { OrderRouteService } from 'src/app/services/order-route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  orderRoutes: OrderRoute[];

  constructor(private orderRoutesService: OrderRouteService, private router: Router) {
    console.log("Constructor");
    this.orderRoutes = [];
  }

  ngOnInit(): void {
    console.log("Ng");
    this.list();
  }
  list() {
    this.orderRoutesService.list().subscribe((data) => {
      this.orderRoutes = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No,cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderRoutesService.delete(id).subscribe(
          (data) => {
            console.log('Eliminado correctamente', data);  // Verifica la respuesta
            this.ngOnInit();
            Swal.fire({
              title: "Eliminado",
              text: "Se ha eliminado correctamente",
              icon: "success",
            });
          },
          (error) => {
            console.error('Error al eliminar', error);  // Revisa si hay algún error
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar el registro.",
              icon: "error",
            });
          }
        );
      }
    });
  }
  create() {
    this.router.navigate(["order-routes/create"]);
  }
  view(id: number) {
    this.router.navigate(["order-routes/view", id]);
  }
  update(id: number) {
    this.router.navigate(["order-routes/update", id]);
  }
}
