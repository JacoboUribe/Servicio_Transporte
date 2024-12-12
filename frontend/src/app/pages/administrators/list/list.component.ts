import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-administrator-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  administrators: Administrator[];

  constructor(private administratorService: AdministratorService, private router: Router) {
    this.administrators = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.administratorService.list().subscribe((data) => {
      this.administrators = data;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.administratorService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Eliminado", "Se ha eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/administrators/create"]);
  }

  view(id: number) {
    this.router.navigate(["/administrators/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/administrators/update", id]);
  }
}
