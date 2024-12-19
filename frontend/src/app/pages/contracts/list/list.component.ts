import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  customerId = 0;

  constructor(private contractsService: ContractService, private router: Router, private route:ActivatedRoute) {
    console.log("Constructor");
    this.contracts = [];
    this.customerId= 0;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    const currentUrl = this.route.snapshot.url.join('/');
    if(currentUrl.includes('filterByCustomer')){
      this.filterByCustomer();
    }else{
      this.list()
    }
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
  filterByCustomer(){
    this.contractsService.listByCustomer(this.customerId).subscribe(data=>{
      this.contracts = data
    })
  }
  showShares(id:number){
    console.log(id);
    this.router.navigate(["shares/filterByContract", id])
  }

}
