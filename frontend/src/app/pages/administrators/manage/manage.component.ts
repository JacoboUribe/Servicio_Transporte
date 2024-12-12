import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-administrator-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  administrator: Administrator;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private administratorService: AdministratorService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.administrator = { id: 0, user_id: "", service_id: 0 };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.activateRoute.snapshot.params.id) {
      this.administrator.id = this.activateRoute.snapshot.params.id;
      this.getAdministrator(this.administrator.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      user_id: ["", [Validators.required]],
      service_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getAdministrator(id: number) {
    this.administratorService.view(id).subscribe((data) => {
      this.administrator = data;
      this.theFormGroup.patchValue(this.administrator);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.administratorService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "Se ha creado el administrador correctamente", "success");
      this.router.navigate(["/administrators/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.administratorService.update(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado el administrador correctamente", "success");
      this.router.navigate(["/administrators/list"]);
    });
  }
}
