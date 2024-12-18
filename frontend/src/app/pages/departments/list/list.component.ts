import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  departments: Department[];

  constructor(private departmentsService: DepartmentService, private router: Router) {
    console.log("Constructor");
    this.departments = [];
  }

  ngOnInit(): void {
    console.log("Ng");
    this.list();
  }
  list() {
    this.departmentsService.list().subscribe((data) => {
      this.departments = data;
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
        this.departmentsService.delete(id).subscribe((data) => {
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
    this.router.navigate(["departments/create"]);
  }
  view(id: number) {
    this.router.navigate(["departments/view", id]);
  }
  update(id: number) {
    this.router.navigate(["departments/update", id]);
  }
}
