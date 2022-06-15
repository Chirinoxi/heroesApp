import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes-response.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent implements OnInit {
  private _heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
    });
  }

  public get heroes(): Heroe[] {
    return this._heroes;
  }

  public set heroes(value: Heroe[]) {
    this._heroes = value;
  }
}
