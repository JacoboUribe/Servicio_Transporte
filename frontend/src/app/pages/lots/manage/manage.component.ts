import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Lot } from "src/app/models/lot.model";
import { LotService } from "src/app/services/lot.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-lot-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  lot: Lot;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private lotService: LotService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.lot = { id: 0, weigth: 0, route_id: 0, order_route_id: 0 };
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
      this.lot.id = this.activateRoute.snapshot.params.id;
      this.getLot(this.lot.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      weigth: [0, [Validators.required, Validators.min(1)]],
      route_id: [0, [Validators.required, Validators.min(1)]],
      order_route_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getLot(id: number) {
    this.lotService.view(id).subscribe((data) => {
      this.lot = data;
      this.theFormGroup.patchValue(this.lot);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.lotService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "Se ha creado el lote correctamente", "success");
      this.router.navigate(["/lots/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.lotService.update(this.lot).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado el lote correctamente", "success");
      this.router.navigate(["/lots/list"]);
    });
  }
}
