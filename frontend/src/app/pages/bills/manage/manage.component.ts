import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Bill } from "src/app/models/bill.model";
import { BillService } from "src/app/services/bill.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-bill-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  bill: Bill;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private billService: BillService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.bill = { id: 0, date_time: new Date(), details: "", share_id: 0, spent_id: 0 };
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
      this.bill.id = this.activateRoute.snapshot.params.id;
      this.getBill(this.bill.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      date_time: ["", [Validators.required]],
      details: ["", [Validators.required, Validators.maxLength(255)]],
      share_id: [0, [Validators.required, Validators.min(1)]],
      spent_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getBill(id: number) {
    this.billService.view(id).subscribe((data) => {
      this.bill = data;
      this.theFormGroup.patchValue(this.bill);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.billService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "Se ha creado la factura correctamente", "success");
      this.router.navigate(["/bills/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.billService.update(this.bill).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado la factura correctamente", "success");
      this.router.navigate(["/bills/list"]);
    });
  }
}
