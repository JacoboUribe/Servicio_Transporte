import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { Addreesseservice } from "src/app/services/address.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-address-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  addresses: Address[];

  constructor(private addressesService: Addreesseservice, private router: Router) {
    console.log("Constructor");
    this.addresses = [];
  }

  ngOnInit(): void {
    console.log("NgOnInit");
    this.list();
  }

  list() {
    this.addressesService.list().subscribe((data) => {
      this.addresses = data;
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
        this.addressesService.delete(id).subscribe(() => {
          this.ngOnInit(); // Refrescar lista tras eliminar
          Swal.fire({
            title: "Eliminado",
            text: "Se ha eliminado correctamente",
            icon: "success",
          });
        });
      }
    });
  }

  create() {
    this.router.navigate(["addresses/create"]);
  }

  view(id: number) {
    this.router.navigate(["addresses/view", id]);
  }

  update(id: number) {
    this.router.navigate(["addresses/update", id]);
  }
}
