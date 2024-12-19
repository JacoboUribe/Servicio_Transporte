import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '2' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '2'},
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '2' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '1' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '2' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '0' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '0' },
    {path: '/addresses/list', title: 'Direcciones',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/bills/list', title: 'Facturas',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/cities/list', title: 'Ciudades',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/contracts/list', title: 'Contratos',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/customers/list', title: 'Clientes',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/departments/list', title: 'Departamentos',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/natural-peoples/list', title: 'Personas Naturales',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/order-routes/list', title: 'Orden de Rutas',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/routes/list', title: 'Rutas',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/shares/list', title: 'Cuota',  icon:'ni-circle-08 text-pink', class: '1'},
    {path: '/vehicles/list', title: 'Vehiculos',  icon:'ni-circle-08 text-pink', class: '1'},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  theUser: User;
  subscription: Subscription;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private theSecurityService: SecurityService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   this.subscription = this.theSecurityService.getUser().subscribe(data =>{
    this.theUser = data;
   })
  }
  gettheSecurityService(){
    return this.theSecurityService
  }
}
