import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuarios-response.interface';
import { map, Observable, of, tap } from 'rxjs';

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

  /**
   * Función que verifica en nuestro almacenamiento local si
   * existe información acerca del token/id asociado a un usuario.
   * @returns objeto Observable<boolean>
   */
  public verifyAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('id')) {
      return of(false);
    }
    const id = localStorage.getItem('id');
    const loginUrl: string = `${this.baseUrl}/usuarios/${id}`;
    return this.httpClient.get<Usuario>(loginUrl).pipe(
      map((resp) => {
        console.log('resp:', resp);
        this.auth = resp;
        return true;
      })
    );
  }

  public login(): Observable<Usuario> {
    const loginUrl: string = `${this.baseUrl}/usuarios/1`;
    return this.httpClient.get<Usuario>(loginUrl).pipe(
      tap((resp) => (this.auth = resp)),
      tap((resp) => localStorage.setItem('id', resp.id.toString()))
    );
  }

  public logout(): void {
    this.auth = undefined;
    return;
  }
}
