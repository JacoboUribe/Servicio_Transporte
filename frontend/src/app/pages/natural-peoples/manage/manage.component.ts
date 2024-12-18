import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NaturalPeople } from 'src/app/models/natural-people.model';
import { NaturalPeopleService } from 'src/app/services/natural-people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  naturalPeople: NaturalPeople;
  mode: number;
  naturalPeopleFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private naturalPeopleService: NaturalPeopleService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.naturalPeople = {
      id: 0,
      type_document: '',
      birthdate: new Date(),
      customer_id: 0,
      user_id: '',
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
      this.naturalPeople.id = this.activateRoute.snapshot.params.id;
      this.getNaturalPeople(this.naturalPeople.id);
    }
  }

  configFormGroup() {
    this.naturalPeopleFormGroup = this.formBuilder.group({
      type_document: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      customer_id: [null, [Validators.required]],
      user_id: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.naturalPeopleFormGroup.controls;
  }

  getNaturalPeople(id: number) {
    this.naturalPeopleService.view(id).subscribe((data: NaturalPeople) => {
      this.naturalPeople = data;
      this.naturalPeopleFormGroup.patchValue(data);
    });
  }

  create() {
    if (this.naturalPeopleFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.naturalPeopleService.create(this.naturalPeople).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado la persona natural', 'success');
      this.router.navigate(['/natural-people/list']);
    });
  }

  update() {
    if (this.naturalPeopleFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error en el formulario', 'Revisa los campos en rojo', 'error');
      return;
    }

    this.naturalPeopleService.update(this.naturalPeople).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado la persona natural', 'success');
      this.router.navigate(['/natural-people/list']);
    });
  }

}
