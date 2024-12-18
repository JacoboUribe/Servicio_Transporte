import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NaturalPeople } from 'src/app/models/natural-people.model';
import { NaturalPeopleService } from 'src/app/services/natural-people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  naturalpeoples: NaturalPeople[];

  constructor(private naturalpeoplesService: NaturalPeopleService, private router: Router) {
    console.log("Constructor");
    this.naturalpeoples = [];
  }

  ngOnInit(): void {
    console.log("Ng");
    this.list();
  }
  list() {
    this.naturalpeoplesService.list().subscribe((data) => {
      this.naturalpeoples = data;
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
        this.naturalpeoplesService.delete(id).subscribe((data) => {
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
    this.router.navigate(["natural-peoples/create"]);
  }
  view(id: number) {
    this.router.navigate(["natural-peoples/view", id]);
  }
  update(id: number) {
    this.router.navigate(["natural-peoples/update", id]);
  }

}
