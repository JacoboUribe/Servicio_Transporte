import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "src/app/models/service.model";
import { ServiceService } from "src/app/services/service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-service-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  service: Service = { amount: 0, date: new Date(), description: "" };
  mode: number = 0;
  formGroup: FormGroup;
  trySend: boolean = false;

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      date: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");

    if (currentUrl.includes("view")) this.mode = 1;
    else if (currentUrl.includes("create")) this.mode = 2;
    else if (currentUrl.includes("update")) this.mode = 3;

    if (this.route.snapshot.params.id) {
      const id = this.route.snapshot.params.id;
      this.serviceService.view(id).subscribe((data) => {
        this.service = data;
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
    this.serviceService.create(this.formGroup.value).subscribe(() => {
      Swal.fire("Creado", "El servicio ha sido creado correctamente", "success");
      this.router.navigate(["/services/list"]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Revisa los campos del formulario", "error");
      return;
    }
    this.serviceService.update(this.service).subscribe(() => {
      Swal.fire("Actualizado", "El servicio ha sido actualizado", "success");
      this.router.navigate(["/services/list"]);
    });
  }
}
