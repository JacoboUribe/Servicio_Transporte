import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Share } from "src/app/models/share.model";
import { ShareService } from "src/app/services/share.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-share-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  share: Share;
  mode: number; // mode = 1 ---> view, mode = 2 ---> create, mode = 3 ---> update
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private shareService: ShareService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.share = { id: 0, amount: 0, interest: 0, contract_id: 0 };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.share.id = this.activateRoute.snapshot.params.id;
      this.getShare(this.share.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      amount: ["", [Validators.required, Validators.min(1)]],
      interest: ["", [Validators.required, Validators.min(0)]],
      contract_id: ["", [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getShare(id: number) {
    this.shareService.view(id).subscribe((data) => {
      this.share = data;
      this.theFormGroup.patchValue(this.share);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.shareService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire("Creado", "La cuota se ha creado correctamente", "success");
      this.router.navigate(["/shares/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }

    this.shareService.update(this.share).subscribe(() => {
      Swal.fire("Actualizado", "La cuota ha sido actualizada correctamente", "success");
      this.router.navigate(["/shares/list"]);
    });
  }
}
