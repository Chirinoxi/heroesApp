import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes-response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl = new URL(environment.baseUrl);

  constructor(private http: HttpClient) {}

  /**
   * Función que retorna una copia nuestra url base pero cno algún parámetro nuevo.
   *
   * @param key
   * @param value
   * @returns
   */
  public addParameterToUrl(url: URL, key: any, value: any): URL {
    if (typeof (value) == undefined) {
      return url;
    } else {
      key = encodeURIComponent(key);
      value = encodeURIComponent(value);
      url.searchParams.append(key, value);
      return url;
    };
  }

  public getHeroes(): Observable<Heroe[]> {
    const url: string = this.baseUrl.toString() + 'heroes';
    return this.http.get<Heroe[]>(url);
  }

  public getHeroeById(id: string): Observable<Heroe> {
    const url: string = this.baseUrl.toString() + 'heroes/' + id;
    return this.http.get<Heroe>(url);
  }

  public getSuggestions(query: string): Observable<Heroe[]> {
    const url: string = `${this.baseUrl.toString()}heroes?q=${query}`;
    return this.http.get<Heroe[]>(url);
  }

  public insertHeroe(heroe: Heroe): Observable<Heroe> {
    const obj = Object.entries(heroe);
    let url: string = `${this.baseUrl.toString()}heroes`;
    console.log('url:', url);
    // for (const i of obj) {
    //   const key: string = i[0] as string;
    //   const value: string = i[1] as string;
    //   url = this.addParameterToUrl(url, key, value);
    // }
    return this.http.post<Heroe>(url, heroe);
  }

  public updateHeroe(heroe: Heroe): Observable<Heroe> {
    let url: string = this.baseUrl.toString() + 'heroes/' + heroe.id;
    return this.http.patch<Heroe>(url, heroe);
  }

  public deleteHeroe(heroe: Heroe): Observable<Heroe> {
    let url: string = this.baseUrl.toString() + 'heroes/' + heroe.id;
    return this.http.delete<Heroe>(url);
  }
}
