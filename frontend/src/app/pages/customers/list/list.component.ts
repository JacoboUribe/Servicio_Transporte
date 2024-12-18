import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  customers: Customer[];

  constructor(private customersService: CustomerService, private router: Router) {
    console.log("Constructor");
    this.customers = [];
  }

  ngOnInit(): void {
    console.log("Ng");
    this.list();
  }
  list() {
    this.customersService.list().subscribe((data) => {
      this.customers = data;
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
        this.customersService.delete(id).subscribe((data) => {
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
    this.router.navigate(["customers/create"]);
  }
  view(id: number) {
    this.router.navigate(["customers/view", id]);
  }
  update(id: number) {
    this.router.navigate(["customers/update", id]);
  }

}
