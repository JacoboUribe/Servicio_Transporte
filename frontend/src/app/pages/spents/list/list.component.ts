import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Spent } from "src/app/models/spent.model";
import { SpentService } from "src/app/services/spent.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-spent-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  spents: Spent[] = [];

  constructor(private spentService: SpentService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.spentService.list().subscribe((data) => {
      this.spents = data;
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
        this.spentService.delete(id).subscribe(() => {
          this.list();
          Swal.fire("Eliminado", "El gasto se ha eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/spents/create"]);
  }

  view(id: number) {
    this.router.navigate(["/spents/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/spents/update", id]);
  }
}
