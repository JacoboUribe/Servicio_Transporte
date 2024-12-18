import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  contracts: Contract[];

  constructor(private contractsService: ContractService, private router: Router) {
    console.log("Constructor");
    this.contracts = [];
  }

  ngOnInit(): void {
    console.log("Ng");
    this.list();
  }
  list() {
    this.contractsService.list().subscribe((data) => {
      this.contracts = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No,cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.contractsService.delete(id).subscribe((data) => {
          this.ngOnInit();
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
    this.router.navigate(["contracts/create"]);
  }
  view(id: number) {
    this.router.navigate(["contracts/view", id]);
  }
  update(id: number) {
    this.router.navigate(["contracts/update", id]);
  }

}
