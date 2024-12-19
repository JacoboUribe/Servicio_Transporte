import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Share } from 'src/app/models/share.model';
import { ShareService } from 'src/app/services/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  share: Share;
  mode: number;
  shareFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private shareService: ShareService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.share = {
      id: 0,
      amount: 0,
      interest: 0,
      status: false,
      contract_id: 0
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
      this.share.id = this.activateRoute.snapshot.params.id;
      this.getShare(this.share.id);
    }
  }

  configFormGroup() {
    this.shareFormGroup = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(0)]],
      interest: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      contract_id: [null, [Validators.required]],
      status: [this.share.status || false, Validators.required],
    });
  }

  get formControls() {
    return this.shareFormGroup.controls;
  }

  getShare(id: number) {
    this.shareService.view(id).subscribe((data: Share) => {
      this.share = data;
      this.shareFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.shareFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.shareService.create(this.share).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado el share', 'success');
      this.router.navigate(['/shares/list']);
    });
  }

  update() {
    if (this.shareFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.shareService.update(this.share).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado el share', 'success');
      this.router.navigate(['/shares/list']);
    });
  }
  payment() {
    console.log(JSON.stringify(this.share));
    this.shareService.update(this.share).subscribe((data) => {
      Swal.fire("PAGO", " se ha PAGADO exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["shares/list"]);
  });
  }
}
