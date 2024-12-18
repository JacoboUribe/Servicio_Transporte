import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  department: Department;
  mode: number;
  departmentFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private departmentService: DepartmentService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.department = {
      id: 0,
      department_name: '',
      region: '',
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
      this.department.id = this.activateRoute.snapshot.params.id;
      this.getDepartment(this.department.id);
    }
  }

  configFormGroup() {
    this.departmentFormGroup = this.formBuilder.group({
      department_name: ['', [Validators.required, Validators.maxLength(100)]],
      region: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  get formControls() {
    return this.departmentFormGroup.controls;
  }

  getDepartment(id: number) {
    this.departmentService.view(id).subscribe((data: Department) => {
      this.department = data;
      this.departmentFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.departmentFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.departmentService.create(this.department).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado el departamento', 'success');
      this.router.navigate(['/departments/list']);
    });
  }

  update() {
    if (this.departmentFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.departmentService.update(this.department).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado el departamento', 'success');
      this.router.navigate(['/departments/list']);
    });
  }

}
