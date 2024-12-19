import { User } from 'src/app/models/user.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user: User;
  subscription: Subscription;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private securityService: SecurityService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.subscription = this.securityService.getUser().subscribe((data) => {
      this.user = data;
    });

    // Llamamos al método para obtener el contador de fallos
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  public getSession() {
    return this.securityService.existSession();
  }

  Logout() {
    this.securityService.logout();
    this.router.navigate(['login']);
  }


}
