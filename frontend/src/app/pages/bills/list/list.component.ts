import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Bill } from "src/app/models/bill.model";
import { BillService } from "src/app/services/bill.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-bill-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  bills: Bill[];

  constructor(private billService: BillService, private router: Router) {
    this.bills = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.billService.list().subscribe((data) => {
      this.bills = data;
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
        this.billService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Eliminado", "Se ha eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/bills/create"]);
  }

  view(id: number) {
    this.router.navigate(["/bills/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/bills/update", id]);
  }
}
