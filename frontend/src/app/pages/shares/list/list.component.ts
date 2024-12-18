import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Share } from 'src/app/models/share.model';
import { ShareService } from 'src/app/services/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  shares: Share[];

  constructor(private sharesService: ShareService, private router: Router) {
    console.log("Constructor");
    this.shares = [];
  }

  ngOnInit(): void {
    console.log("Ng");
    this.list();
  }
  list() {
    this.sharesService.list().subscribe((data) => {
      this.shares = data;
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
        this.sharesService.delete(id).subscribe((data) => {
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
    this.router.navigate(["shares/create"]);
  }
  view(id: number) {
    this.router.navigate(["shares/view", id]);
  }
  update(id: number) {
    this.router.navigate(["shares/update", id]);
  }

}
