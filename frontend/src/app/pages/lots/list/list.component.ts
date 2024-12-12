import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Lot } from "src/app/models/lot.model";
import { LotService } from "src/app/services/lot.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-lot-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  lots: Lot[] = [];

  constructor(private lotService: LotService, private router: Router) {}

  ngOnInit(): void {
    this.getLots();
  }

  getLots() {
    this.lotService.list().subscribe((data) => {
      this.lots = data;
    });
  }

  deleteLot(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este lote",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.lotService.delete(id).subscribe(() => {
          this.getLots();
          Swal.fire("Eliminado", "El lote ha sido eliminado", "success");
        });
      }
    });
  }

  createLot() {
    this.router.navigate(["lots/create"]);
  }

  viewLot(id: number) {
    this.router.navigate(["lots/view", id]);
  }

  updateLot(id: number) {
    this.router.navigate(["lots/update", id]);
  }
}
