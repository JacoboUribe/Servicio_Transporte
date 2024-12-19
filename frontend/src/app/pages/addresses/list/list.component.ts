import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cityId = 0;
  addresses: Address[];

  constructor(private addressesService: AddressService, private router: Router, private route:ActivatedRoute) {
    console.log("Constructor");
    this.addresses = [];
    this.cityId = 0;
  }

  ngOnInit(): void {
    this.cityId = Number(this.route.snapshot.params['id']);
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('filterByCity')) {
      this.filterByCity();
    } else {
      this.list();
    }
  }
  list() {
    this.addressesService.list().subscribe((data) => {
      this.addresses = data;
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
        this.addressesService.delete(id).subscribe((data) => {
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
    this.router.navigate(["addresses/create"]);
  }
  view(id: number) {
    this.router.navigate(["addresses/view", id]);
  }
  update(id: number) {
    this.router.navigate(["addresses/update", id]);
  }
  filterByCity() {
    this.addressesService.listByCity(this.cityId).subscribe(data => {
      this.addresses = data;
    });
  }

}
