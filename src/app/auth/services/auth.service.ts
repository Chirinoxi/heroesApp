import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuarios-response.interface';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Usuario | undefined;

  constructor(private httpClient: HttpClient) {}

  public get auth(): Usuario | undefined {
    return this._auth;
  }

  public set auth(value: Usuario | undefined) {
    this._auth = value;
  }

  public login(): Observable<Usuario> {
    const loginUrl: string = `${this.baseUrl}/usuarios/1`;
    return this.httpClient
      .get<Usuario>(loginUrl)
      .pipe(tap((resp: Usuario) => this.auth = resp));
  }
}
