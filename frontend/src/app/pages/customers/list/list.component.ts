import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-customer-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  customers: Customer[];

  constructor(private customerService: CustomerService, private router: Router) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.customerService.list().subscribe((data) => {
      this.customers = data;
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
        this.customerService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Eliminado", "Se ha eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/customers/create"]);
  }

  view(id: number) {
    this.router.navigate(["/customers/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/customers/update", id]);
  }
}
