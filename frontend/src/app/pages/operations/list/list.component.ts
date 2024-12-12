import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Operation } from "src/app/models/operation.model";
import { OperationService } from "src/app/services/operation.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-operation-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  operations: Operation[] = [];

  constructor(private operationService: OperationService, private router: Router) {}

  ngOnInit(): void {
    this.getOperations();
  }

  getOperations() {
    this.operationService.list().subscribe((data) => {
      this.operations = data;
    });
  }

  deleteOperation(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar esta operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.operationService.delete(id).subscribe(() => {
          this.getOperations();
          Swal.fire("Eliminado", "La operación ha sido eliminada", "success");
        });
      }
    });
  }

  createOperation() {
    this.router.navigate(["operations/create"]);
  }

  viewOperation(id: number) {
    this.router.navigate(["operations/view", id]);
  }

  updateOperation(id: number) {
    this.router.navigate(["operations/update", id]);
  }
}
