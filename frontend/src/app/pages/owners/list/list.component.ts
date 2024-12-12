import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Owner } from "src/app/models/owner.model";
import { OwnerService } from "src/app/services/owner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-owner-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  owners: Owner[] = [];

  constructor(private ownerService: OwnerService, private router: Router) {}

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners() {
    this.ownerService.list().subscribe((data) => {
      this.owners = data;
    });
  }

  deleteOwner(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este propietario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.ownerService.delete(id).subscribe(() => {
          this.getOwners();
          Swal.fire("Eliminado", "El propietario ha sido eliminado", "success");
        });
      }
    });
  }

  createOwner() {
    this.router.navigate(["owners/create"]);
  }

  viewOwner(id: number) {
    this.router.navigate(["owners/view", id]);
  }

  updateOwner(id: number) {
    this.router.navigate(["owners/update", id]);
  }
}
