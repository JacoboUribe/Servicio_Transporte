import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { BillService } from 'src/app/services/bill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  bills: Bill[];

  constructor(private billsService: BillService, private router: Router) {
    console.log("Constructor");
    this.bills = [];
  }

  ngOnInit(): void {
    console.log("Ng");
    this.list();
  }
  list() {
    this.billsService.list().subscribe((data) => {
      this.bills = data;
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
        this.billsService.delete(id).subscribe((data) => {
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
    this.router.navigate(["bills/create"]);
  }
  view(id: number) {
    this.router.navigate(["bills/view", id]);
  }
  update(id: number) {
    this.router.navigate(["bills/update", id]);
  }

}
