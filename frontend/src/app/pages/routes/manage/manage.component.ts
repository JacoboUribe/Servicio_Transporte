import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  route: Route;
  mode: number;
  routeFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private routeService: RouteService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.route = {
      id: 0,
      starting_point: '',
      destination_point: '',
      distance: 0,
      delivery_date: new Date(),
      contract_id: 0,
      vehicle_id: 0,
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
      this.route.id = this.activateRoute.snapshot.params.id;
      this.getRoute(this.route.id);
    }
  }

  configFormGroup() {
    this.routeFormGroup = this.formBuilder.group({
      starting_point: ['', [Validators.required]],
      destination_point: ['', [Validators.required]],
      distance: [0, [Validators.required, Validators.min(0)]],
      delivery_date: ['', [Validators.required]],
      vehicle_id: [null, [Validators.required]],
      contract_id: [null, [Validators.required]],
    });
  }

  get formControls() {
    return this.routeFormGroup.controls;
  }

  getRoute(id: number) {
    this.routeService.view(id).subscribe((data: Route) => {
      this.route = data;
      this.routeFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.routeFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.routeService.create(this.route).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado la ruta', 'success');
      this.router.navigate(['/routes/list']);
    });
  }

  update() {
    if (this.routeFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.routeService.update(this.route).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado la ruta', 'success');
      this.router.navigate(['/routes/list']);
    });
  }

}
