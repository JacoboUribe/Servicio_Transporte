import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  contract: Contract;
  mode: number;
  contractFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private contractService: ContractService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.contract = {
      id: 0,
      start_date: new Date(),
      end_date: new Date(),
      customer_id: 0,
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
      this.contract.id = this.activateRoute.snapshot.params.id;
      this.getContract(this.contract.id);
    }
  }

  configFormGroup() {
    this.contractFormGroup = this.formBuilder.group({
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]],
      customer_id: [null, [Validators.required, Validators.min(1)]],
    });
  }

  get formControls() {
    return this.contractFormGroup.controls;
  }

  getContract(id: number) {
    this.contractService.view(id).subscribe((data: Contract) => {
      this.contract = data;
      this.contractFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.contractFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.contractService.create(this.contract).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado el contrato', 'success');
      this.router.navigate(['/contracts/list']);
    });
  }

  update() {
    if (this.contractFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.contractService.update(this.contract).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado el contrato', 'success');
      this.router.navigate(['/contracts/list']);
    });
  }

}
