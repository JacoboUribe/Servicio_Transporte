import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Spent } from "src/app/models/spent.model";
import { SpentService } from "src/app/services/spent.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-spent-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  spent: Spent = { details: 0, driver_id: 0, owner_id: 0, service_id: 0 };
  mode: number = 0;
  formGroup: FormGroup;
  trySend: boolean = false;

  constructor(
    private spentService: SpentService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      details: [0, [Validators.required, Validators.min(1)]],
      driver_id: [0, [Validators.required, Validators.min(1)]],
      owner_id: [0, [Validators.required, Validators.min(1)]],
      service_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.spentService.view(id).subscribe((data) => {
        this.spent = data;
        this.formGroup.patchValue(data);
      });
    }
  }

  create() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    this.spentService.create(this.formGroup.value).subscribe(() => {
      Swal.fire("Creado", "El gasto ha sido creado correctamente", "success");
      this.router.navigate(["/spents/list"]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    const id = this.spent.id!;
    this.spentService.update(this.spent).subscribe(() => {
      Swal.fire("Actualizado", "El gasto ha sido actualizado", "success");
      this.router.navigate(["/spents/list"]);
    });
  }
}
