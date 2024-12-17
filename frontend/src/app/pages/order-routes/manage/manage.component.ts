import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRoute } from 'src/app/models/order-route.model';
import { OrderRouteService } from 'src/app/services/order-route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  orderRoute: OrderRoute;
  mode: number;
  orderRouteFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private orderRouteService: OrderRouteService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.orderRoute = {
      id: 0,
      route_id: 0,
      address_id: 0,
    };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.orderRoute.id = this.activateRoute.snapshot.params.id;
      this.getOrderRoute(this.orderRoute.id);
    }
  }

  configFormGroup() {
    this.orderRouteFormGroup = this.formBuilder.group({
      id: [null],
      route_id: [0, [Validators.required]],
      address_id: [0, [Validators.required]],
    });
  }

  get formControls() {
    return this.orderRouteFormGroup.controls;
  }

  getOrderRoute(id: number) {
    this.orderRouteService.view(id).subscribe((data: OrderRoute) => {
      this.orderRoute = data;
      this.orderRouteFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.orderRouteFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.orderRouteService.create(this.orderRoute).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado la ruta de pedido', 'success');
      this.router.navigate(['/order-routes/list']);
    });
  }

  update() {
    if (this.orderRouteFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.orderRouteService.update(this.orderRoute).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado la ruta de pedido', 'success');
      this.router.navigate(['/order-routes/list']);
    });
  }

}
