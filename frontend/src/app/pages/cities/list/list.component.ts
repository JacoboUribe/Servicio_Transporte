import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cities: City[];
  departmentId: number;

  constructor(
    private citiesService: CityService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {
    console.log("Constructor");
    this.cities = [];
    this.departmentId = 0;
  }

  ngOnInit(): void {
    this.departmentId = Number(this.route.snapshot.params['id']);
    const currentUrl = this.router.url;
    if (currentUrl.includes('filterByDepartment')) {
      this.filterByDepartment();
    } else {
      this.list();
    }
  }

  list() {
    this.citiesService.list().subscribe((data) => {
      this.cities = data;
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
        this.citiesService.delete(id).subscribe((data) => {
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
    this.router.navigate(["cities/create"]);
  }

  view(id: number) {
    this.router.navigate(["cities/view", id]);
  }

  update(id: number) {
    this.router.navigate(["cities/update", id]);
  }

  filterByDepartment() {
    this.citiesService.listByDepartment(this.departmentId).subscribe(data => {
      this.cities = data;
    });
  }
  showAddresses(id: number) {
    this.router.navigate(["addresses/filterByCity", id]);
  }
  
}
