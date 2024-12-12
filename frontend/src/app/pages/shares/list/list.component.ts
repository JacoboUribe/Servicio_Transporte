import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Share } from "src/app/models/share.model";
import { ShareService } from "src/app/services/share.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-share-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  shares: Share[] = [];

  constructor(private shareService: ShareService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.shareService.list().subscribe((data) => {
      this.shares = data;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro que desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.shareService.delete(id).subscribe(() => {
          this.list();
          Swal.fire("Eliminado", "El registro ha sido eliminado correctamente", "success");
        });
      }
    });
  }

  create() {
    this.router.navigate(["/shares/create"]);
  }

  view(id: number) {
    this.router.navigate(["/shares/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/shares/update", id]);
  }
}
