import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Contract } from "src/app/models/contract.model";
import { ContractService } from "src/app/services/contract.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-contract-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  contracts: Contract[];

  constructor(private contractService: ContractService, private router: Router) {
    this.contracts = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.contractService.list().subscribe((data) => {
      this.contracts = data;
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
        this.contractService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Eliminado", "Se ha eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/contracts/create"]);
  }

  view(id: number) {
    this.router.navigate(["/contracts/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/contracts/update", id]);
  }
}
