import { SecurityService } from "./../../services/security.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  theUser: User;
  constructor(private SecurityService: SecurityService, private router: Router) {
    this.theUser = { email: "", password: "" };
  }

  ngOnInit() {}
  ngOnDestroy() {}

  login() {
    this.SecurityService.login(this.theUser).subscribe({
      next: (data) => {
        this.SecurityService.saveSession(data);
        this.router.navigate(["dashboard"]);
      },
      error: (error) => {
        Swal.fire(
          "Autenticación Inválida",
          "Usuario o contraseña inválido",
          "error"
        );
      },
    });
  }

}
