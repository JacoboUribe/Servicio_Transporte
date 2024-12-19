import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  vehicles: Vehicle[];

  constructor(private vehiclesService: VehicleService, private router: Router) {
    this.vehicles = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.vehiclesService.list().subscribe((data) => {
      this.vehicles = data;
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
        this.vehiclesService.delete(id).subscribe(() => {
          // Eliminar el vehículo localmente sin recargar la lista
          this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
          Swal.fire({
            title: "Eliminado",
            text: "Se ha eliminado correctamente",
            icon: "success",
          });
        });
      }
    });
  }

  location(id:number){
    this.router.navigate(["vehicles/location/"+ id])
  }

  create() {
    this.router.navigate(["vehicles/create"]);
  }

  view(id: number) {
    this.router.navigate(["vehicles/view", id]);
  }

  update(id: number) {
    this.router.navigate(["vehicles/update", id]);
  }
}
