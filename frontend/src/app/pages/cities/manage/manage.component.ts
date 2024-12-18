import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  city: City;
  mode: number;
  cityFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private cityService: CityService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.city = {
      id: 0,
      zip_code: '',
      city_name: '',
      department_id: '',
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
      this.city.id = this.activateRoute.snapshot.params.id;
      this.getCity(this.city.id);
    }
  }

  configFormGroup() {
    this.cityFormGroup = this.formBuilder.group({
      city_name: ['', [Validators.required, Validators.minLength(1)]],
      zip_code: ['', [Validators.required, Validators.maxLength(10)]],
      department_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get formControls() {
    return this.cityFormGroup.controls;
  }

  getCity(id: number) {
    this.cityService.view(id).subscribe((data: City) => {
      this.city = data;
      this.cityFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.cityFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.cityService.create(this.city).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado la ciudad', 'success');
      this.router.navigate(['/cities/list']);
    });
  }

  update() {
    if (this.cityFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.cityService.update(this.city).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado la ciudad', 'success');
      this.router.navigate(['/cities/list']);
    });
  }
}
