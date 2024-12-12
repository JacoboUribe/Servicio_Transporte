import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderRoute } from "src/app/models/order-route.model";
import { order_routeservice } from "src/app/services/order-route.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-order-route-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  orderRoute: OrderRoute;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private orderRouteService: order_routeservice,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.orderRoute = { id: 0, address_id: 0, route_id: 0 };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.activateRoute.snapshot.params.id) {
      this.orderRoute.id = this.activateRoute.snapshot.params.id;
      this.getOrderRoute(this.orderRoute.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      address_id: [0, [Validators.required, Validators.min(1)]],
      route_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getOrderRoute(id: number) {
    this.orderRouteService.view(id).subscribe((data) => {
      this.orderRoute = data;
      this.theFormGroup.patchValue(this.orderRoute);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.orderRouteService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "Se ha creado la ruta del pedido correctamente", "success");
      this.router.navigate(["/order-routes/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.orderRouteService.update(this.orderRoute).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado la ruta del pedido correctamente", "success");
      this.router.navigate(["/order-routes/list"]);
    });
  }
}
