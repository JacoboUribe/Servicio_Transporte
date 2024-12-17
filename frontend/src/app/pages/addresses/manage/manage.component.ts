import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  address: Address;
  mode: number;
  addressFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private addressService: AddressService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.address = {
      id: 0,
      address_name: '',
      address: '',
      references: '',
      neighborhood: '',
      city_id: 0,
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
      this.address.id = this.activateRoute.snapshot.params.id;
      this.getAddress(this.address.id);
    }
  }

  configFormGroup() {
    this.addressFormGroup = this.formBuilder.group({
      id: [null],
      address_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      references: ['', [Validators.minLength(4), Validators.maxLength(100)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      city_id: [0, [Validators.required, Validators.min(1)]],
      distribution_center_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get formControls() {
    return this.addressFormGroup.controls;
  }

  getAddress(id: number) {
    this.addressService.view(id).subscribe((data: Address) => {
      this.address = data;
      this.addressFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.addressFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.addressService.create(this.address).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado la dirección', 'success');
      this.router.navigate(['/addresses/list']);
    });
  }

  update() {
    if (this.addressFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.addressService.update(this.address).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado la dirección', 'success');
      this.router.navigate(['/addresses/list']);
    });
  }
}
