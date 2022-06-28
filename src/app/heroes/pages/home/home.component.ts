import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/usuarios-response.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 15px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  public get auth(): Usuario {
    return { ...this.authService.auth! };
  }

  public logout(): void {
    this.router.navigate(['./auth/login']);
    this.authService.logout();
  }
}
