import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Heroe } from '../interfaces/heroes-response.interface'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl = new URL('http://localhost:3000');

  constructor(private http: HttpClient) { }

  /**
   * Función que retorna una copia nuestra url base pero cno algún parámetro nuevo.
   * 
   * @param key 
   * @param value 
   * @returns 
   */
  public addParameterToUrl(key: string, value: string): URL {
    let url: URL = this.baseUrl;
    key     = encodeURIComponent(key);
    value   = encodeURIComponent(value);
    url.searchParams.append(key, value);
    return url;
  }

  public getHeroes (): Observable<Heroe[]>{
    const url: string = this.baseUrl.toString() + 'heroes'
    return this.http.get<Heroe[]>(url);
  }

}
