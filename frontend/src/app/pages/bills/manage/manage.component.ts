import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { BillService } from 'src/app/services/bill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  bill: Bill;
  mode: number;
  billFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private billService: BillService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.bill = {
      id: 0,
      date_time: new Date(),
      details: '',
      share_id: 0,
      spent_id: 0,
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
      this.bill.id = this.activateRoute.snapshot.params.id;
      this.getBill(this.bill.id);
    }
  }

  configFormGroup() {
    this.billFormGroup = this.formBuilder.group({
      date_time: [new Date(), [Validators.required]],
      details: ['', [Validators.maxLength(255)]],
      share_id: [null, [Validators.required, Validators.min(1)]],
      spent_id: [null, [Validators.required, Validators.min(1)]],
    });
  }

  get formControls() {
    return this.billFormGroup.controls;
  }

  getBill(id: number) {
    this.billService.view(id).subscribe((data: Bill) => {
      this.bill = data;
      this.billFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.billFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.billService.create(this.bill).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado la factura', 'success');
      this.router.navigate(['/bills/list']);
    });
  }

  update() {
    if (this.billFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.billService.update(this.bill).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado la factura', 'success');
      this.router.navigate(['/bills/list']);
    });
  }

}
