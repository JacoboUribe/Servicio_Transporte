import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  vehicle: Vehicle;
  mode: number;
  vehicleFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private vehicleService: VehicleService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.vehicle = {
      id: 0,
      license: '',
      model: '',
      load_capacity: 0
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
      this.vehicle.id = this.activateRoute.snapshot.params.id;
      this.getVehicle(this.vehicle.id);
    }
  }

  configFormGroup() {
    this.vehicleFormGroup = this.formBuilder.group({
      id: [null],
      license: ['', [Validators.required, Validators.maxLength(255)]],
      model: ['', [Validators.required, Validators.maxLength(255)]],
      load_capacity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get formControls() {
    return this.vehicleFormGroup.controls;
  }

  getVehicle(id: number) {
    this.vehicleService.view(id).subscribe((data: Vehicle) => {
      this.vehicle = data;
      this.vehicleFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.vehicleFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.vehicleService.create(this.vehicle).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado el vehículo', 'success');
      this.router.navigate(['/vehicles/list']);
    });
  }

  update() {
    if (this.vehicleFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.vehicleService.update(this.vehicle).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado el vehículo', 'success');
      this.router.navigate(['/vehicles/list']);
    });
  }
}
