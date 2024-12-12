import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Operation } from "src/app/models/operation.model";
import { OperationService } from "src/app/services/operation.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-operation-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  operation: Operation;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private operationService: OperationService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.operation = { id: 0, start_date: new Date(), end_date: new Date(), vehicle_id: 0 };
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
      this.operation.id = this.activateRoute.snapshot.params.id;
      this.getOperation(this.operation.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      vehicle_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getOperation(id: number) {
    this.operationService.view(id).subscribe((data) => {
      this.operation = data;
      this.theFormGroup.patchValue(this.operation);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.operationService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "Se ha creado la operación correctamente", "success");
      this.router.navigate(["/operations/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.operationService.update(this.operation).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado la operación correctamente", "success");
      this.router.navigate(["/operations/list"]);
    });
  }
}
