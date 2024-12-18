import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  customer: Customer;
  mode: number;
  customerFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private customerService: CustomerService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.customer = {
      id: 0,
      phone_number: '',
      number_orders: 0,
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
      this.customer.id = this.activateRoute.snapshot.params.id;
      this.getCustomer(this.customer.id);
    }
  }

  configFormGroup() {
    this.customerFormGroup = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      number_orders: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get formControls() {
    return this.customerFormGroup.controls;
  }

  getCustomer(id: number) {
    this.customerService.view(id).subscribe((data: Customer) => {
      this.customer = data;
      this.customerFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.customerFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.customerService.create(this.customer).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado el cliente', 'success');
      this.router.navigate(['/customers/list']);
    });
  }

  update() {
    if (this.customerFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.customerService.update(this.customer).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado el cliente', 'success');
      this.router.navigate(['/customers/list']);
    });
  }

}
