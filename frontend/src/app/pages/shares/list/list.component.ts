import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Share } from 'src/app/models/share.model';
import { ShareService } from 'src/app/services/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  contractId: 0;
  shares: Share[];

  constructor(private sharesService: ShareService, private router: Router, private route: ActivatedRoute) {
    console.log("Constructor");
    this.shares = [];
    this.contractId = 0;
  }

  ngOnInit(): void {
    this.contractId = this.route.snapshot.params['id'];
    console.log("contractId", this.contractId);
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('filterByContract')){
      this.filterByContract();
    }else{
    this.list();
    }
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
  showBills(id:number){
    this.router.navigate(["bills/filterByShare", id])
  }
  filterByContract() {
    this.sharesService.listByContract(this.contractId).subscribe(data => {
      this.shares = data;
    });
  }  
  payment(id: number) {
    this.router.navigate(["shares/payment/" + id]);
  }

}
