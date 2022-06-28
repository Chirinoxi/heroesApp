import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuarios-response.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  public login(): void {
    this.authService.login().subscribe((user: Usuario) => {
      if (user.id) {
        this.router.navigate(['./heroes']);
      }
    });
    return;
  }

  public loginWithoutCredentials(): void {
    this.router.navigate(['./heroes']);
  }

  public logout(): void {
    console.log('Cerrando sesión .....');
    return;
  }
}
